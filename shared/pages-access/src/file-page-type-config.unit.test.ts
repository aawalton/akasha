import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { Asked } from "../../pages-query/src/index"
import { z } from "zod"
import {
  fileMediaConfig,
  fileSequenceConfig,
  MEDIA_CONFIG_KEY,
  SEQUENCE_CONFIG_KEY,
} from "./file-page-type-config"

type Stated = Readonly<Record<string, unknown>>

const SlugAsked = z.object({ slug: z.object({ is: z.string() }) })

function asking(bySlug: Readonly<Record<string, Stated>>): {
  readonly deps: { ask: (query: ComposedQuery) => Promise<Asked> }
  readonly seen: readonly ComposedQuery[]
} {
  const seen: ComposedQuery[] = []
  return {
    seen,
    deps: {
      ask: async (query) => {
        seen.push(query)
        const wanted = SlugAsked.parse(query.where).slug.is
        const held = bySlug[wanted]
        return {
          ok: true,
          answer: {
            n: held === undefined ? 0 : 1,
            value: null,
            over: null,
            rows: held === undefined ? [] : [{ values: held }],
          },
        }
      },
    },
  }
}

const SEQUENCE = { groupBy: "story", orderBy: "chapterNumber", direction: "asc" }

describe("a page type's sequence and media config are read from the file beside it", () => {
  it("reads the config the page type's own file states", async () => {
    const { deps } = asking({
      "story-chapter": { "extends-slug": "chapter", [SEQUENCE_CONFIG_KEY]: SEQUENCE },
    })
    expect(await fileSequenceConfig("story-chapter", deps)).toEqual(SEQUENCE)
  })

  it("walks extends-slug to the nearest ancestor stating one, since the pages sit on the descendants", async () => {
    const { deps } = asking({
      "story-chapter-royal-road": { "extends-slug": "story-chapter-read" },
      "story-chapter-read": { "extends-slug": "story-chapter" },
      "story-chapter": { "extends-slug": "chapter", [SEQUENCE_CONFIG_KEY]: SEQUENCE },
      chapter: {},
    })
    expect(await fileSequenceConfig("story-chapter-royal-road", deps)).toEqual(SEQUENCE)
  })

  it("takes the nearest declaration rather than the furthest", async () => {
    const own = { groupBy: "book", orderBy: "seq", direction: "desc" }
    const { deps } = asking({
      "story-chapter-royal-road": { "extends-slug": "story-chapter", [SEQUENCE_CONFIG_KEY]: own },
      "story-chapter": { [SEQUENCE_CONFIG_KEY]: SEQUENCE },
    })
    expect(await fileSequenceConfig("story-chapter-royal-road", deps)).toEqual(own)
  })

  it("answers nothing where no page type of that slug stands as a file", async () => {
    const { deps } = asking({})
    expect(await fileSequenceConfig("no-such-type", deps)).toBeNull()
  })

  it("answers nothing where the whole chain states none", async () => {
    const { deps } = asking({ "page-type": { "extends-slug": "domain" }, domain: {} })
    expect(await fileSequenceConfig("page-type", deps)).toBeNull()
  })

  it("stops on a chain that points back at itself", async () => {
    const { deps, seen } = asking({ a: { "extends-slug": "b" }, b: { "extends-slug": "a" } })
    expect(await fileSequenceConfig("a", deps)).toBeNull()
    expect(seen.length).toBe(2)
  })

  it("raises where the page query service did not answer, since a null would read as a page type declaring none", async () => {
    const deps = {
      ask: async (): Promise<Asked> => ({ ok: false, why: "no answer within 5000ms" }),
    }
    await expect(fileSequenceConfig("story-chapter", deps)).rejects.toThrow(
      "the page query service did not answer"
    )
  })

  it("reads the media config off its own kebab key", async () => {
    const media = { audio: { sourcePropertyId: "text", renderer: "tts" } }
    const { deps, seen } = asking({ "story-chapter": { [MEDIA_CONFIG_KEY]: media } })
    expect(await fileMediaConfig("story-chapter", deps)).toEqual(media)
    expect(seen[0]?.keys).toContain(MEDIA_CONFIG_KEY)
  })
})
