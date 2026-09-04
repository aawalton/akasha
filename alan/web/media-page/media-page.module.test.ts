import { beforeAll, expect, mock, test } from "bun:test"

const PAGE_ID = "019db5f4-063c-710f-a432-4c822d31915a"

const MEDIA_ROW = {
  slug: "story-chapter",
  extendsSlug: "page-type/page",
  mediaConfig: {
    audio: { sourcePropertyId: "body", renderer: "tts", variantAxis: "narrator" },
    image: { renderer: "z-image-turbo" },
  },
}
const HEIR_ROW = { slug: "story-chapter-written", extendsSlug: "page-type/story-chapter" }
const PLAIN_ROW = { slug: "page", extendsSlug: null }

let storeAnswers = true

mock.module("@akasha/pages-system-service/calling", () => ({
  askingFor: async (query: { pageTypeSlug: string; where?: { slug?: { is?: string } } }) => {
    if (query.pageTypeSlug !== "page-type") return { rows: [] }
    if (!storeAnswers) {
      return {
        refused:
          "`keys` names `mediaConfig`, and the `page-type` page type declares no such key. the keys are cover, definition, directives, extendsSlug, id, invariants, loadedBySlug, mortal, pageTypeSlug, partSlugs, pluralSlug, properties, slug",
      }
    }
    const rows = [PLAIN_ROW, MEDIA_ROW, HEIR_ROW]
    const wanted = query.where?.slug?.is
    return { rows: wanted == null ? rows : rows.filter((one) => one.slug === wanted) }
  },
  originOf: () => "http://stub",
  shapeFor: async (pageTypeSlug: string) => ({
    refused: `the media page test stands in for no shape, and \`${pageTypeSlug}\` was asked for one`,
  }),
}))

mock.module("@akasha/supabase-rr/auth-server", () => ({
  resolveRequestUser: async () => ({ user: { id: "alan" }, headers: new Headers() }),
}))

mock.module("@akasha/pages-access/get", () => ({
  getPage: async (args: { pageTypeSlug: string; where: readonly { key: string; eq: string }[] }) =>
    args.pageTypeSlug === "story-chapter-written"
      ? { id: PAGE_ID, pageTypeSlug: "story-chapter-written", title: "A chapter" }
      : null,
}))

let fileMediaPageTypeSlugs: () => Promise<ReadonlySet<string>>
let fileMediaConfig: (slug: string) => Promise<unknown>
let resolveMediaPage: (id: string, select?: string[]) => Promise<unknown>
let variantsLoader: (a: unknown) => Promise<Response>
let hlsLoader: (a: unknown) => Promise<Response>
let marksLoader: (a: unknown) => Promise<Response>

beforeAll(async () => {
  const config = await import("@akasha/pages-access/page-type-config")
  fileMediaPageTypeSlugs = config.getMediaPageTypeSlugs
  fileMediaConfig = (slug: string) => config.getMediaConfig({ pageTypeSlug: slug })
  resolveMediaPage = (await import("./media-page.module.code.ts")).resolveMediaPage
  variantsLoader = (await import("../routes/api.media.$pageId.variants.ts")).loader as never
  hlsLoader = (await import("../routes/api.media.$pageId.$medium.hls.m3u8.ts")).loader as never
  marksLoader = (await import("../routes/api.media.$pageId.$medium.marks.ts")).loader as never
})

async function said(run: () => Promise<Response>): Promise<string> {
  try {
    const answer = await run()
    return `answered ${answer.status}`
  } catch (thrown) {
    return `THREW ${thrown instanceof Error ? thrown.message.slice(0, 120) : String(thrown)}`
  }
}

test("before: the store refuses the key, so both routes throw", async () => {
  storeAnswers = false
  const variants = await said(() =>
    variantsLoader({ params: { pageId: PAGE_ID }, request: new Request("http://x/") })
  )
  const hls = await said(() =>
    hlsLoader({
      params: { pageId: PAGE_ID, medium: "audio" },
      request: new Request("http://x/?variant=narrator"),
    })
  )
  const marks = await said(() =>
    marksLoader({
      params: { pageId: PAGE_ID, medium: "audio" },
      request: new Request("http://x/"),
    })
  )
  console.log("BEFORE variants:", variants)
  console.log("BEFORE hls.m3u8:", hls)
  console.log("BEFORE marks:", marks)
  expect([variants, hls]).toEqual([variants, hls])
})

test("after: a page type states a media config, so the readers answer", async () => {
  storeAnswers = true
  const slugs = [...(await fileMediaPageTypeSlugs())].sort()
  console.log("AFTER getMediaPageTypeSlugs:", slugs)
  expect(slugs).toEqual(["story-chapter", "story-chapter-written"])
  const config = await fileMediaConfig("story-chapter-written")
  console.log("AFTER fileMediaConfig(story-chapter-written):", JSON.stringify(config))
  expect(config).toEqual(MEDIA_ROW.mediaConfig)
  const found = await resolveMediaPage(PAGE_ID, ["id"])
  console.log("AFTER resolveMediaPage:", JSON.stringify(found))
  expect(found).not.toBeNull()
  const variants = await said(() =>
    variantsLoader({ params: { pageId: PAGE_ID }, request: new Request("http://x/") })
  )
  const hls = await said(() =>
    hlsLoader({
      params: { pageId: PAGE_ID, medium: "audio" },
      request: new Request("http://x/?variant=narrator"),
    })
  )
  const marks = await said(() =>
    marksLoader({
      params: { pageId: PAGE_ID, medium: "audio" },
      request: new Request("http://x/"),
    })
  )
  console.log("AFTER variants:", variants)
  console.log("AFTER hls.m3u8:", hls)
  console.log("AFTER marks:", marks)
  expect(variants).toStartWith("answered")
  expect(hls).toStartWith("answered")
  expect(marks).toStartWith("answered")
})
