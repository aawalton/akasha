import { afterAll, beforeEach, describe, expect, it, mock } from "bun:test"
import type { PageTypeShape, ShapeAsked } from "@shared/pages-query/ask"
import * as realAsk from "@shared/pages-query/ask"

const realAskAttempts = realAsk.ASK_ATTEMPTS
const realAskComposed = realAsk.askComposed
const realAskPage = realAsk.askPage
const realAskPageTypes = realAsk.askPageTypes
const realAskShape = realAsk.askShape

const CARD_ID = "019f1a5a-e6e0-7f71-a278-e0d8c5e0b5db"
const PERSONA_ID = "019eb7f9-08cd-722e-8e5e-7c6928dc578d"

const declaration = (key: string, on: string, held: Readonly<Record<string, unknown>> = {}) => ({
  key,
  type: "text",
  title: key,
  pageId: `${on}-${key}`,
  on,
  returnType: null,
  values: null,
  targetSlug: null,
  slugProperty: null,
  mayBeGone: false,
  ...held,
})

const SHAPES: Readonly<Record<string, PageTypeShape>> = {
  persona: {
    pageType: "persona",
    pageTypeId: PERSONA_ID,
    ownerSlug: null,
    declarations: [declaration("title", "page"), declaration("voice", "persona")],
  },
  "idle-persona-card": {
    pageType: "idle-persona-card",
    pageTypeId: CARD_ID,
    ownerSlug: "player-id",
    declarations: [declaration("title", "page")],
  },
  spelled: {
    pageType: "spelled",
    pageTypeId: CARD_ID,
    ownerSlug: null,
    declarations: [
      declaration("pixel-width", "spelled"),
      declaration("run", "spelled", { type: "number" }),
      declaration("mood", "spelled", { type: "select(text)", values: ["calm", "hurried"] }),
    ],
  },
}

let askedFor: string[] = []

await mock.module("@shared/pages-query/ask", () => ({
  ASK_ATTEMPTS: 4,
  askShape: async (pageType: string): Promise<ShapeAsked> => {
    askedFor.push(pageType)
    const held = SHAPES[pageType]
    if (held === undefined) return { ok: false, why: "no such page type", status: 404 }
    return { ok: true, shape: held }
  },
  askComposed: realAskComposed,
  askPage: realAskPage,
  askPageTypes: realAskPageTypes,
}))

afterAll(() => {
  mock.module("@shared/pages-query/ask", () => ({
    ASK_ATTEMPTS: realAskAttempts,
    askComposed: realAskComposed,
    askPage: realAskPage,
    askPageTypes: realAskPageTypes,
    askShape: realAskShape,
  }))
})

const { fileShapeOf, forgetFileShapes } = await import("./file-shape")

beforeEach(() => {
  forgetFileShapes()
  askedFor = []
})

describe("the shape a page type is read under", () => {
  it("takes the id the service worked out, and derives none of its own", async () => {
    expect((await fileShapeOf("persona"))?.pageTypeId).toBe(PERSONA_ID)
  })

  it("asks for the shape by slug, and asks once however many readers want it", async () => {
    await fileShapeOf("persona")
    await fileShapeOf("persona")
    expect(askedFor).toEqual(["persona"])
  })

  it("carries every declaration the service resolved along the chain", async () => {
    const shape = await fileShapeOf("persona")
    expect(shape?.definitions.map((one) => one.id).sort()).toEqual(["title", "voice"])
  })

  it("names each definition by its key in camelCase, as a row's attributes are named", async () => {
    const shape = await fileShapeOf("spelled")
    expect(shape?.definitions.map((one) => one.id)).toContain("pixelWidth")
    expect(shape?.definitions.find((one) => one.id === "pixelWidth")?.key).toBe("pixel-width")
  })

  it("makes options of the values a select states", async () => {
    const shape = await fileShapeOf("spelled")
    const one = shape?.definitions.find((each) => each.id === "mood")
    expect(one?.config).toEqual({
      options: [
        { id: "calm", label: "calm" },
        { id: "hurried", label: "hurried" },
      ],
    })
  })

  it("carries the owner slug the service read, and leaves it off where there is none", async () => {
    expect((await fileShapeOf("idle-persona-card"))?.ownerSlug).toBe("player-id")
    expect((await fileShapeOf("persona"))?.ownerSlug).toBeUndefined()
  })

  it("answers nothing for a page type the service says nothing about", async () => {
    expect(await fileShapeOf("no-such-type")).toBeNull()
  })
})
