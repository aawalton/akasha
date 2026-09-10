import { JSDOM, VirtualConsole } from "jsdom"
import type {
  Course,
  CourseData,
  CourseList,
  Episode,
  Subject,
  SubjectList,
} from "../course-types/course-types.module.code.ts"
import {
  classifyError,
  logError,
  retryWithBackoff,
  toError,
} from "../sync-outcome/sync-outcome.module.code.ts"

const SOURCE_URL = "https://plus.thegreatcourses.com/allprograms"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

async function fetchHtml(url: string): Promise<JSDOM> {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
  const landed = response.url === "" ? url : response.url
  const html = await response.text()
  const virtualConsole = new VirtualConsole()
  virtualConsole.on("error", () => {})
  virtualConsole.on("warn", () => {})
  virtualConsole.on("info", () => {})
  virtualConsole.on("log", () => {})
  return new JSDOM(html, { url: landed, runScripts: "outside-only", virtualConsole })
}

async function getCatalog(url: string): Promise<JSDOM> {
  return retryWithBackoff(() => fetchHtml(url)).catch((thrown) => {
    const err = toError(thrown)
    logError("Catalog fetch", "getCatalog", err, classifyError(err), { url })
    throw thrown
  })
}

export function extractExternalIdFromUrl(courseUrl: string): string {
  try {
    const url = new URL(courseUrl)
    const pathSegments = url.pathname.split("/").filter((s) => s !== "")
    const last = pathSegments[pathSegments.length - 1]
    if (last == null || last === "") {
      throw new Error(`could not extract course slug from URL: ${courseUrl}`)
    }
    return last
  } catch (thrown) {
    const err = toError(thrown)
    logError("ID extraction", "extractExternalIdFromUrl", err, classifyError(err), { courseUrl })
    throw thrown
  }
}

function getCourseList(dom: JSDOM): CourseList {
  try {
    const document = dom.window.document
    const courses: Course[] = []

    const courseList = document.querySelector(".course-list")
    if (!courseList) throw new Error("Could not find course list container")

    const here = new URL(dom.window.document.URL)

    for (const link of courseList.querySelectorAll("a")) {
      const href = link.getAttribute("href")
      const title = link.textContent?.trim()
      if (href == null || title == null || title === "") continue

      const url = new URL(href, here).href
      if (new URL(url).origin !== here.origin) continue
      if (url.includes("/allsubjects/") || url.includes("/static/")) continue

      courses.push({ title, url, externalId: extractExternalIdFromUrl(url) })
    }

    courses.sort((a, b) => a.title.localeCompare(b.title))
    return { courses }
  } catch (thrown) {
    const err = toError(thrown)
    logError("Course parsing", "getCourseList", err, classifyError(err))
    throw thrown
  }
}

function getSubjects(dom: JSDOM): SubjectList {
  try {
    const document = dom.window.document
    const here = new URL(document.URL)
    const subjects: Subject[] = []

    const subjectsTab = document.querySelector("#category-tab")
    if (!subjectsTab) throw new Error("Could not find subjects tab content")

    for (const subjectDiv of subjectsTab.querySelectorAll(".letter")) {
      const titleLink = subjectDiv.querySelector("a.section-title")
      if (!titleLink) continue

      const subjectTitle = titleLink.querySelector("strong")?.textContent?.trim()
      const subjectUrl = titleLink.getAttribute("href")
      if (subjectTitle == null || subjectTitle === "" || subjectUrl == null) continue

      const courses: Course[] = []
      let currentElement = subjectDiv.nextElementSibling

      while (currentElement && !currentElement.classList.contains("letter")) {
        if (currentElement.tagName === "A") {
          const url = currentElement.getAttribute("href")
          const title = currentElement.textContent?.trim()
          if (url != null && title != null && title !== "") {
            const fullUrl = new URL(url, here).href
            courses.push({ title, url: fullUrl, externalId: extractExternalIdFromUrl(fullUrl) })
          }
        }
        currentElement = currentElement.nextElementSibling
      }

      subjects.push({ title: subjectTitle, url: subjectUrl, courses })
    }

    subjects.sort((a, b) => a.title.localeCompare(b.title))
    return { subjects }
  } catch (thrown) {
    const err = toError(thrown)
    logError("Subject parsing", "getSubjects", err, classifyError(err))
    throw thrown
  }
}

function parseCourseHtml(dom: JSDOM): readonly Episode[] {
  const episodes: Episode[] = []

  const lecturesList = dom.window.document.querySelector("#lectures-list")
  if (!lecturesList) throw new Error("Could not find lectures list")

  for (const entry of lecturesList.querySelectorAll(".media-table.media-pdp")) {
    const playButton = entry.querySelector(".play-lecture")
    if (!playButton) continue

    const title = playButton.getAttribute("data-title")?.trim()
    if (title == null || title === "") continue

    episodes.push({
      title,
      lengthSeconds: Number.parseInt(playButton.getAttribute("data-len") ?? "0", 10),
      episodeNumber: Number.parseInt(playButton.getAttribute("data-idx") ?? "0", 10),
    })
  }

  return episodes
}

export async function getCourseDetails(course: Course, courseId: string): Promise<CourseData> {
  return retryWithBackoff(async () => {
    const dom = await fetchHtml(course.url)
    const ogTitleMeta = dom.window.document.querySelector('meta[property="og:title"]')
    const titleMeta = dom.window.document.querySelector('meta[name="title"]')
    const extractedTitle = (
      ogTitleMeta?.getAttribute("content") ??
      titleMeta?.getAttribute("content") ??
      ""
    )
      .replace(/["]/g, "")
      .trim()
      .replace(/\s*\|\s*Plus$/, "")
    const title = extractedTitle.length > 0 ? extractedTitle : course.title
    const episodes = parseCourseHtml(dom)
    const totalLengthSeconds = episodes.reduce((sum, ep) => sum + ep.lengthSeconds, 0)
    return { courseId, title, episodes, totalLengthSeconds }
  }).catch((thrown) => {
    const err = toError(thrown)
    logError("Course details", "getCourseDetails", err, classifyError(err), {
      courseId,
      courseUrl: course.url,
    })
    throw thrown
  })
}

export async function getCatalogData(): Promise<{
  readonly courses: CourseList
  readonly subjects: SubjectList
}> {
  console.log("Fetching Great Courses catalog...")
  const catalog = await getCatalog(SOURCE_URL)

  console.log("Parsing course list...")
  const courses = getCourseList(catalog)

  console.log("Parsing subjects...")
  const subjects = getSubjects(catalog)

  return { courses, subjects }
}
