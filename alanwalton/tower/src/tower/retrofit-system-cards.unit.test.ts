import { describe, expect, test } from "bun:test"
import {
  createProgressionState,
  parseDing,
  reduceCard,
  renderDing,
  retrofitChapterText,
} from "./retrofit-system-cards"

const FENCE = "```"

function recognize(line: string): string | null {
  const ding = parseDing(line)
  return ding === null ? null : renderDing(ding)
}

describe("parseDing/renderDing — level", () => {
  test("historical 'LEVEL N' reformats to the template", () => {
    expect(recognize("LEVEL 2")).toBe("LEVEL UP — 2")
  })
  test("historical 'LEVEL UP — N · +X attribute points' keeps only the level", () => {
    expect(recognize("LEVEL UP — 4 · +3 attribute points")).toBe("LEVEL UP — 4")
  })
  test("already-reduced 'LEVEL UP — N' is idempotent", () => {
    expect(recognize("LEVEL UP — 2")).toBe("LEVEL UP — 2")
  })
})

describe("parseDing/renderDing — skill", () => {
  test("emergence with '· I' qualifier", () => {
    expect(recognize("SKILL EMERGED — Ember Channel · I")).toBe("SKILL — Ember Channel")
  })
  test("emergence with '(Novice)' qualifier", () => {
    expect(recognize("SKILL EMERGED — Ember Burst (Novice)")).toBe("SKILL — Ember Burst")
  })
  test("evolution carries the new rung after the arrow", () => {
    expect(recognize("SKILL ADVANCED — Ember Burst (Apprentice)")).toBe(
      "SKILL — Ember Burst → Apprentice"
    )
  })
  test("within-rung tick is not a ding", () => {
    expect(recognize("SKILL +4 — Ember Burst · Apprentice 6")).toBeNull()
  })
  test("the Ember Lash → Ember Wave rename is applied", () => {
    expect(recognize("SKILL EMERGED — Ember Lash (Novice)")).toBe("SKILL — Ember Wave")
  })
  test("already-reduced template forms are idempotent", () => {
    expect(recognize("SKILL — Ember Channel")).toBe("SKILL — Ember Channel")
    expect(recognize("SKILL — Ember Burst → Apprentice")).toBe("SKILL — Ember Burst → Apprentice")
  })
})

describe("parseDing/renderDing — affinity", () => {
  test("emergence strips the tier suffix to the element", () => {
    expect(recognize("AFFINITY ACQUIRED — Ember · I")).toBe("AFFINITY — Ember")
  })
  test("promotion carries the new tier after the arrow", () => {
    expect(recognize("AFFINITY ADVANCED — Ember · Manipulation")).toBe(
      "AFFINITY — Ember → Manipulation"
    )
  })
  test("already-reduced template forms are idempotent", () => {
    expect(recognize("AFFINITY — Ember")).toBe("AFFINITY — Ember")
    expect(recognize("AFFINITY — Ember → Manipulation")).toBe("AFFINITY — Ember → Manipulation")
  })
})

describe("parseDing/renderDing — class & title", () => {
  test("class None is suppressed", () => {
    expect(recognize("CLASS — None")).toBeNull()
  })
  test("a real class is a ding", () => {
    expect(recognize("CLASS — Emberwright")).toBe("CLASS — Emberwright")
  })
  test("a title is a ding", () => {
    expect(recognize("TITLE — Warden-Slayer")).toBe("TITLE — Warden-Slayer")
  })
})

describe("parseDing — non-dings drop", () => {
  for (const line of [
    "HOSTILE NEUTRALIZED — Ashling · Tier 1",
    "WEAK POINT — core (exploited)",
    "+60 XP        ( 60 / 100 )",
    "WARDEN DEFEATED — The Glut",
    "Experience awarded: +110",
    "Attribute points unallocated: 3",
    "ATTRIBUTE ALLOCATED — VITALITY 6 → 7",
    "Maximum Vitae 70 → 78",
    "FOCUS RESTORED — 10 → 110",
    "◆  FLOOR 2 · THE CISTERN",
    "A warden holds this floor. Clear it to ascend.",
    "ESSENCE ABSORBED — Ember",
    "ITEM ACQUIRED — Furnace-heart",
    "◆  ASCENT UNSEALED",
  ]) {
    test(`drops: ${line}`, () => {
      expect(parseDing(line)).toBeNull()
    })
  }
})

describe("reduceCard", () => {
  test("the opening Soul Appraisal is preserved", () => {
    const r = reduceCard(
      "The Tower · Soul Appraisal",
      ["DESIGNATION   Alan", "CLASS         None"],
      createProgressionState()
    )
    expect(r).toEqual({ kind: "preserve" })
  })
  test("a mixed card keeps only its dings", () => {
    const r = reduceCard(
      "The Tower",
      [
        "WARDEN DEFEATED — Drowned Sentry",
        "Experience awarded: +110",
        "LEVEL 2",
        "Attribute points unallocated: 3",
      ],
      createProgressionState()
    )
    expect(r).toEqual({ kind: "dings", dings: ["LEVEL UP — 2"] })
  })
  test("a card with no progression event reduces to an empty ding list", () => {
    const r = reduceCard(
      "The Tower",
      ["HOSTILE NEUTRALIZED — Ashling", "WEAK POINT — core"],
      createProgressionState()
    )
    expect(r).toEqual({ kind: "dings", dings: [] })
  })
})

describe("reduceCard — stateful progression admission", () => {
  test("a skill emerges once, then re-display is deduped", () => {
    const state = createProgressionState()
    const first = reduceCard("The Tower", ["SKILL EMERGED — Ember Channel · I"], state)
    expect(first).toEqual({ kind: "dings", dings: ["SKILL — Ember Channel"] })
    const second = reduceCard("The Tower", ["SKILL EMERGED — Ember Channel · I"], state)
    expect(second).toEqual({ kind: "dings", dings: [] })
  })

  test("an evolution back to the emergence rung is not a ding (within-rung)", () => {
    const state = createProgressionState()
    reduceCard("The Tower", ["SKILL EMERGED — Ember-Tempered Body · I"], state)
    const again = reduceCard("The Tower", ["SKILL ADVANCED — Ember-Tempered Body (Novice)"], state)
    expect(again).toEqual({ kind: "dings", dings: [] })
  })

  test("a genuine rung increase dings; a repeat of that rung does not", () => {
    const state = createProgressionState()
    reduceCard("The Tower", ["SKILL EMERGED — Ember Burst (Novice)"], state)
    const up = reduceCard("The Tower", ["SKILL ADVANCED — Ember Burst (Apprentice)"], state)
    expect(up).toEqual({ kind: "dings", dings: ["SKILL — Ember Burst → Apprentice"] })
    const repeat = reduceCard("The Tower", ["SKILL ADVANCED — Ember Burst (Apprentice)"], state)
    expect(repeat).toEqual({ kind: "dings", dings: [] })
  })

  test("dings within a card are emitted in canonical order (level→skill→affinity)", () => {
    const state = createProgressionState()
    const r = reduceCard(
      "The Tower",
      [
        "SKILL EMERGED — Ember Burst (Novice)",
        "SKILL ADVANCED — Ember Burst (Apprentice)",
        "LEVEL 4",
        "AFFINITY ACQUIRED — Cinder · I",
      ],
      state
    )
    expect(r).toEqual({
      kind: "dings",
      dings: [
        "LEVEL UP — 4",
        "SKILL — Ember Burst",
        "SKILL — Ember Burst → Apprentice",
        "AFFINITY — Cinder",
      ],
    })
  })

  test("an affinity promotion dings only on a real tier increase", () => {
    const state = createProgressionState()
    reduceCard("The Tower", ["AFFINITY ACQUIRED — Ember · I"], state)
    const promo = reduceCard("The Tower", ["AFFINITY ADVANCED — Ember · Manipulation"], state)
    expect(promo).toEqual({ kind: "dings", dings: ["AFFINITY — Ember → Manipulation"] })
    const repeat = reduceCard("The Tower", ["AFFINITY ADVANCED — Ember · Manipulation"], state)
    expect(repeat).toEqual({ kind: "dings", dings: [] })
  })
})

describe("retrofitChapterText", () => {
  const chapter = [
    "# The Cistern",
    "",
    "The water was black and still.",
    "",
    `**The Tower**`,
    "",
    FENCE,
    "WARDEN DEFEATED — Drowned Sentry",
    "Experience awarded: +110",
    "LEVEL 2",
    "Attribute points unallocated: 3",
    FENCE,
    "",
    "He climbed, dripping, into the dark.",
    "",
    `**The Tower**`,
    "",
    FENCE,
    "HOSTILE NEUTRALIZED — swarm",
    "ESSENCE ABSORBED — Ember",
    FENCE,
    "",
    "And then the silence broke.",
  ].join("\n")

  test("reduces a level card to the template ding", () => {
    const { text } = retrofitChapterText(chapter)
    expect(text).toContain(`**The Tower**\n\n${FENCE}\nLEVEL UP — 2\n${FENCE}`)
  })

  test("removes a card with no surviving ding", () => {
    const { text } = retrofitChapterText(chapter)
    expect(text).not.toContain("HOSTILE NEUTRALIZED")
    expect(text).not.toContain("ESSENCE ABSORBED")
  })

  test("leaves narrative prose byte-for-byte", () => {
    const { text } = retrofitChapterText(chapter)
    expect(text).toContain("The water was black and still.")
    expect(text).toContain("He climbed, dripping, into the dark.")
    expect(text).toContain("And then the silence broke.")
    expect(text.startsWith("# The Cistern")).toBe(true)
  })

  test("is idempotent — a second pass changes nothing", () => {
    const once = retrofitChapterText(chapter).text
    const twice = retrofitChapterText(once).text
    expect(twice).toBe(once)
  })

  test("preserves the opening Soul Appraisal verbatim", () => {
    const withAppraisal = [
      "# The Threshold",
      "",
      `**The Tower · Soul Appraisal**`,
      "",
      FENCE,
      "DESIGNATION   Alan",
      "CLASS         None",
      FENCE,
      "",
      "He opened his eyes.",
    ].join("\n")
    const { text } = retrofitChapterText(withAppraisal)
    expect(text).toContain("DESIGNATION   Alan")
    expect(text).toContain(`**The Tower · Soul Appraisal**`)
  })

  test("a chapter with no system cards is unchanged", () => {
    const prose = "# Quiet\n\nNothing happened here.\n\nThe end.\n"
    expect(retrofitChapterText(prose).text).toBe(prose)
  })

  test("a shared state threads emergence dedup across chapters", () => {
    const state = createProgressionState()
    const ch1 = [
      "# One",
      "",
      `**The Tower**`,
      "",
      FENCE,
      "SKILL EMERGED — Essence Infusion (Novice)",
      FENCE,
    ].join("\n")
    const ch2 = [
      "# Two",
      "",
      `**The Tower**`,
      "",
      FENCE,
      "SKILL ADVANCED — Essence Infusion (Apprentice)",
      FENCE,
    ].join("\n")
    const ch3 = [
      "# Three",
      "",
      `**The Tower**`,
      "",
      FENCE,
      "SKILL ADVANCED — Essence Infusion (Apprentice)",
      FENCE,
    ].join("\n")
    const out1 = retrofitChapterText(ch1, state).text
    const out2 = retrofitChapterText(ch2, state).text
    const out3 = retrofitChapterText(ch3, state).text
    expect(out1).toContain("SKILL — Essence Infusion")
    expect(out2).toContain("SKILL — Essence Infusion → Apprentice")
    expect(out3).not.toContain("SKILL — Essence Infusion")
    expect(out3).not.toContain("**The Tower**")
  })
})
