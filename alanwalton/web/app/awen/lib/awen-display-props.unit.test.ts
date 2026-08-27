import { describe, expect, test } from "bun:test"
import { AwenDisplayPropsSchema } from "./client-envelope"

const validProps = {
  game: {
    externalId: "harem-hotel",
    title: "Harem Hotel",
    display: {
      pollMs: 1800,
      modules: {
        chapterProse: { history: "full" },
        storySoFar: { source: "stateLedger" },
      },
    },
  },
  initialEnvelope: { title: "Harem Hotel" },
}

describe("AwenDisplayPropsSchema", () => {
  test("accepts a well-formed served projection", () => {
    const parsed = AwenDisplayPropsSchema.parse(validProps)
    expect(parsed.game.externalId).toBe("harem-hotel")
    expect(parsed.game.display.pollMs).toBe(1800)
    expect(parsed.initialEnvelope.title).toBe("Harem Hotel")
  })

  test("rejects an unknown top-level key (strict)", () => {
    expect(() => AwenDisplayPropsSchema.parse({ ...validProps, extra: 1 })).toThrow()
  })

  test("rejects a game missing the resolved display", () => {
    expect(() =>
      AwenDisplayPropsSchema.parse({
        game: { externalId: "harem-hotel", title: "Harem Hotel" },
        initialEnvelope: { title: "Harem Hotel" },
      })
    ).toThrow()
  })

  test("rejects a display with a non-numeric pollMs", () => {
    expect(() =>
      AwenDisplayPropsSchema.parse({
        ...validProps,
        game: { ...validProps.game, display: { ...validProps.game.display, pollMs: "soon" } },
      })
    ).toThrow()
  })

  test("rejects an unknown display module key", () => {
    expect(() =>
      AwenDisplayPropsSchema.parse({
        ...validProps,
        game: {
          ...validProps.game,
          display: { ...validProps.game.display, modules: { mystery: {} } },
        },
      })
    ).toThrow()
  })
})
