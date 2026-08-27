import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { Asked } from "../../pages-query/src/index"
import { DETAIL_CONFIG_KEY, getFileDetailConfig } from "./file-detail-config"

function asking(held: Readonly<Record<string, unknown>> | null): {
  readonly deps: { ask: (query: ComposedQuery) => Promise<Asked> }
  readonly seen: readonly ComposedQuery[]
} {
  const seen: ComposedQuery[] = []
  return {
    seen,
    deps: {
      ask: async (query) => {
        seen.push(query)
        return {
          ok: true,
          answer: {
            n: held === null ? 0 : 1,
            value: null,
            over: null,
            rows: held === null ? [] : [{ values: held }],
          },
        }
      },
    },
  }
}

describe("a page type's detail config is read from the file beside it", () => {
  it("asks the page type type for the key by name, since a large value is loaded only where it is asked for", async () => {
    const { deps, seen } = asking({
      slug: "chess-game",
      [DETAIL_CONFIG_KEY]: '{"display":"chess-review"}',
    })
    await getFileDetailConfig("chess-game", deps)
    expect(seen[0]?.["page-type"]).toBe("page-type")
    expect(seen[0]?.keys).toContain(DETAIL_CONFIG_KEY)
    expect(seen[0]?.where).toEqual({ slug: { is: "chess-game" } })
  })

  it("parses the file's text into the config the detail route resolves through", async () => {
    const { deps } = asking({ [DETAIL_CONFIG_KEY]: '{\n  "display": "chess-review"\n}\n' })
    expect(await getFileDetailConfig("chess-game", deps)).toEqual({ display: "chess-review" })
  })

  it("takes a record, since the query service opens a value carried as text into one", async () => {
    const { deps } = asking({ [DETAIL_CONFIG_KEY]: { display: "chess-review" } })
    expect(await getFileDetailConfig("chess-game", deps)).toEqual({ display: "chess-review" })
  })

  it("answers nothing where the page type states no detail config", async () => {
    const { deps } = asking({ slug: "chess-game" })
    expect(await getFileDetailConfig("chess-game", deps)).toBeNull()
  })

  it("answers nothing where no page type of that slug stands as a file", async () => {
    const { deps } = asking(null)
    expect(await getFileDetailConfig("no-such-type", deps)).toBeNull()
  })

  it("answers nothing rather than raising where the file holds what is not JSON", async () => {
    const { deps } = asking({ [DETAIL_CONFIG_KEY]: "display: chess-review" })
    expect(await getFileDetailConfig("chess-game", deps)).toBeNull()
  })
})
