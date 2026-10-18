import { expect, test } from "bun:test"
import { relinked } from "akasha/alan/collection/great-courses/modules/course-relinking/course-relinking.module.code.ts"

const OLD = "https://www.thegreatcoursesplus.com/the-vikings"
const NOW = "https://plus.thegreatcourses.com/the-vikings"

function rowOf(slug: string, link: string) {
  return {
    values: {
      slug,
      externalIdentity: [{ source: "the-great-courses", externalId: slug, externalLink: link }],
    },
  }
}

const VIKINGS = { title: "The Vikings", url: NOW, externalId: "the-vikings" }

test("a course whose link moved is pointed at the catalogue's link", () => {
  const due: unknown = relinked([rowOf("the-vikings", OLD)], [VIKINGS])
  expect(due).toEqual([
    {
      slug: "the-vikings",
      externalIdentity: [
        { source: "the-great-courses", externalId: "the-vikings", externalLink: NOW },
      ],
    },
  ])
})

test("a course whose link is the catalogue's is left alone", () => {
  expect(relinked([rowOf("the-vikings", NOW)], [VIKINGS])).toEqual([])
})

test("a course the catalogue no longer lists keeps its link", () => {
  expect(relinked([rowOf("the-vikings", OLD)], [])).toEqual([])
})
