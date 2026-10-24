import { describe, expect, test } from "bun:test"
import {
  briefFor,
  decisionsIn,
  directivesIn,
  setupFor,
  type TherapistPages,
} from "akasha/alan/couples-therapy/couples-call/modules/brief/couples-call-brief.module.code.ts"
import { absence } from "akasha/domain/decision-kind/pages/absence.decision-kind.ts"
import { constraint } from "akasha/domain/decision-kind/pages/constraint.decision-kind.ts"
import { departure } from "akasha/domain/decision-kind/pages/departure.decision-kind.ts"

function kindOf(slug: string): string {
  return `${constraint.type.replace("page-type/", "")}/${slug}`
}

const PAGES: TherapistPages = {
  definition: "a couples therapist",
  purpose: "Hold the room for both.",
  voice: "Charon",
  decisions: ["Alan has total aphantasia."],
  directives: [
    {
      name: "Gottman",
      act: "Work from Gottman.",
      warrant: "It is studied.",
      aids: ["Hold claims lightly."],
    },
  ],
  settled: [{ title: "Agreements", settled: "They take a break when flooded." }],
}

describe("decisionsIn", () => {
  test("only constraints and absences reach the brief", () => {
    expect(
      decisionsIn([
        { decisionKind: kindOf(constraint.slug), statement: "Both are AuDHD." },
        { decisionKind: kindOf(departure.slug), statement: "A recorder lands notes." },
        { decisionKind: kindOf(absence.slug), statement: "No AI disclaimer unasked." },
      ])
    ).toEqual(["Both are AuDHD.", "No AI disclaimer unasked."])
  })
})

describe("directivesIn", () => {
  test("the recorder directive is left out of a call", () => {
    const named = directivesIn([
      { name: "Start The Recorder", act: "Start it.", warrant: "Or it is lost.", aids: [] },
      {
        name: "Ask By Name",
        act: "Ask one spouse.",
        warrant: "Open questions fail.",
        aids: ["Name them."],
      },
    ]).map((one) => one.name)
    expect(named).toEqual(["Ask By Name"])
  })
})

describe("briefFor", () => {
  test("the brief names Claudius, the bracketed lines, the facts, the directives and the book", () => {
    const brief = briefFor(PAGES)
    expect(brief.startsWith("You are Claudius, a couples therapist. Hold the room for both.")).toBe(
      true
    )
    expect(brief).toContain("[Jenny is speaking]")
    expect(brief).toContain("- Alan has total aphantasia.")
    expect(brief).toContain(
      "- Gottman: Work from Gottman. It is studied.\n  - Hold claims lightly."
    )
    expect(brief).toContain("## Agreements\nThey take a break when flooded.")
  })

  test("a book with nothing settled says so", () => {
    expect(briefFor({ ...PAGES, settled: [] })).toContain("Nothing is settled yet")
  })
})

describe("setupFor", () => {
  test("the session speaks in Claudius's voice and runs unlimited by compressing", () => {
    const setup = setupFor(PAGES) as {
      generationConfig: unknown
      contextWindowCompression: unknown
    }
    expect(setup.generationConfig).toEqual({
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } } },
    })
    expect(setup.contextWindowCompression).toEqual({ slidingWindow: {} })
  })
})
