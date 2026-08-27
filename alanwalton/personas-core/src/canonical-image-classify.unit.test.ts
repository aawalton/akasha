import { describe, expect, test } from "bun:test"
import { CANONICAL_BACKFILL_TAG, classifyCanonicalImage } from "./canonical-image-classify"
import type { NamedRoot } from "./image-locator"

const PERSONAS = "/test/Personas"
const WALLPAPERS = "/test/Pictures/Wallpapers/Personas"
const GENERATED = "/test/Pictures/Generated"
const ROOTS: readonly NamedRoot[] = [
  { tag: "personas", root: PERSONAS },
  { tag: "wallpapers", root: WALLPAPERS },
  { tag: "generated", root: GENERATED },
]

describe("classifyCanonicalImage — personas bucket (four named categories)", () => {
  test("top-level <slug>-anchor.png → anchor, persona, personas root", () => {
    const c = classifyCanonicalImage(`${PERSONAS}/Abby/abby-anchor.png`, ROOTS)
    expect(c).not.toBeNull()
    expect(c?.bucket).toBe("personas")
    expect(c?.category).toBe("anchor")
    expect(c?.persona).toBe("abby")
    expect(c?.grade).toBeUndefined()
    expect(c?.imageRoot).toBe("personas")
    expect(c?.relative).toBe("Abby/abby-anchor.png")
    expect(c?.tags).toContain(CANONICAL_BACKFILL_TAG)
    expect(c?.tags).toContain("anchor")
    expect(c?.tags).toContain("persona:abby")
    expect(c?.title).toContain("abby-anchor.png")
  })

  test("top-level anchor variant (essence) is still anchor", () => {
    const c = classifyCanonicalImage(`${PERSONAS}/Erin/erin-essence.png`, ROOTS)
    expect(c?.category).toBe("anchor")
    expect(c?.persona).toBe("erin")
  })

  test("images/canon/** → canon", () => {
    const c = classifyCanonicalImage(`${PERSONAS}/Amy/images/canon/amy-canon-01.png`, ROOTS)
    expect(c?.category).toBe("canon")
    expect(c?.persona).toBe("amy")
    expect(c?.relative).toBe("Amy/images/canon/amy-canon-01.png")
  })

  test("images/finalists/** → finalist", () => {
    const c = classifyCanonicalImage(
      `${PERSONAS}/Aura/images/finalists/aura-L01-street-nb.png`,
      ROOTS
    )
    expect(c?.category).toBe("finalist")
    expect(c?.persona).toBe("aura")
  })

  test("images/lora/** → lora-source", () => {
    const c = classifyCanonicalImage(`${PERSONAS}/Ali/images/lora/ref-01.jpg`, ROOTS)
    expect(c?.category).toBe("lora-source")
    expect(c?.persona).toBe("ali")
  })

  test("training/** → lora-source with training tag", () => {
    const c = classifyCanonicalImage(`${PERSONAS}/Aine/training/lora-dataset-v2/0007.png`, ROOTS)
    expect(c?.category).toBe("lora-source")
    expect(c?.persona).toBe("aine")
    expect(c?.tags).toContain("training")
  })

  test("images/other/** → null (excluded — discarded)", () => {
    expect(classifyCanonicalImage(`${PERSONAS}/Abby/images/other/scratch.png`, ROOTS)).toBeNull()
  })

  test("images/non-canon/** → null (excluded)", () => {
    expect(classifyCanonicalImage(`${PERSONAS}/Zadi/images/non-canon/x.png`, ROOTS)).toBeNull()
  })

  test("images/rewards/** → null (already durable persona-image rows)", () => {
    expect(classifyCanonicalImage(`${PERSONAS}/Mari/images/rewards/mari-L01.png`, ROOTS)).toBeNull()
  })

  test("unknown persona subtree → null", () => {
    expect(classifyCanonicalImage(`${PERSONAS}/Ruby/voice/clip.png`, ROOTS)).toBeNull()
  })
})

describe("classifyCanonicalImage — explore gradings (rejects kept, grade-tagged)", () => {
  test("<study>-explore/<grade>/ → explore, grade from subdir, study persona", () => {
    const c = classifyCanonicalImage(`${GENERATED}/aura-explore/S/0001.png`, ROOTS)
    expect(c?.bucket).toBe("explore")
    expect(c?.category).toBe("explore")
    expect(c?.persona).toBe("aura")
    expect(c?.grade).toBe("S")
    expect(c?.imageRoot).toBe("generated")
    expect(c?.relative).toBe("aura-explore/S/0001.png")
    expect(c?.tags).toContain("grade:S")
  })

  test("kept reject grade (D) is in-scope, grade-tagged", () => {
    const c = classifyCanonicalImage(
      `${GENERATED}/erin-explore/D/erin-darkhorse-survivor-971.png`,
      ROOTS
    )
    expect(c).not.toBeNull()
    expect(c?.grade).toBe("D")
    expect(c?.tags).toContain("grade:D")
  })

  test("compound grade (A+) parsed from subdir", () => {
    const c = classifyCanonicalImage(`${GENERATED}/lyonette-explore/A+/x.png`, ROOTS)
    expect(c?.grade).toBe("A+")
  })

  test("multi-segment study slug preserved", () => {
    const c = classifyCanonicalImage(`${GENERATED}/dragon-dm-explore/S/x.png`, ROOTS)
    expect(c?.persona).toBe("dragon-dm")
    expect(c?.grade).toBe("S")
  })

  test("non-grade bucket (transformation) → explore, no grade, bucket tag", () => {
    const c = classifyCanonicalImage(
      `${GENERATED}/frieren-explore/transformation/4078502.webp`,
      ROOTS
    )
    expect(c?.bucket).toBe("explore")
    expect(c?.grade).toBeUndefined()
    expect(c?.tags).toContain("bucket:transformation")
  })

  test("loose explore file with trailing -<grade> filename suffix (zadi)", () => {
    const c = classifyCanonicalImage(`${GENERATED}/zadi-explore/004-C0-base-reclining-S.png`, ROOTS)
    expect(c?.bucket).toBe("explore")
    expect(c?.persona).toBe("zadi")
    expect(c?.grade).toBe("S")
  })

  test("loose explore file with no grade suffix → no grade", () => {
    const c = classifyCanonicalImage(`${GENERATED}/zadi-explore/004-base-reclining.png`, ROOTS)
    expect(c?.bucket).toBe("explore")
    expect(c?.grade).toBeUndefined()
  })
})

describe("classifyCanonicalImage — generated outputs", () => {
  test("non-explore dir → generated-output, persona from stripped dir stem", () => {
    const c = classifyCanonicalImage(`${GENERATED}/aine-concepts/concept-01.png`, ROOTS)
    expect(c?.bucket).toBe("generated")
    expect(c?.category).toBe("generated-output")
    expect(c?.persona).toBe("aine")
    expect(c?.imageRoot).toBe("generated")
  })

  test("wallpaper-compose dir → persona stripped of -wallpaper-compose suffix", () => {
    const c = classifyCanonicalImage(`${GENERATED}/astra-wallpaper-compose/wp-01.png`, ROOTS)
    expect(c?.persona).toBe("astra")
    expect(c?.category).toBe("generated-output")
  })

  test("loose root file → generated-output, no persona", () => {
    const c = classifyCanonicalImage(`${GENERATED}/verify-13203.png`, ROOTS)
    expect(c?.bucket).toBe("generated")
    expect(c?.category).toBe("generated-output")
    expect(c?.persona).toBeUndefined()
    expect(c?.relative).toBe("verify-13203.png")
  })
})

describe("classifyCanonicalImage — out of scope → null", () => {
  test("wallpapers root → null", () => {
    expect(classifyCanonicalImage(`${WALLPAPERS}/Aine/aine-L05.png`, ROOTS)).toBeNull()
  })

  test("non-image extension → null", () => {
    expect(classifyCanonicalImage(`${PERSONAS}/Abby/abby-anchor.safetensors`, ROOTS)).toBeNull()
    expect(classifyCanonicalImage(`${GENERATED}/aria-voice-A.wav`, ROOTS)).toBeNull()
  })

  test("outside every named root → null", () => {
    expect(classifyCanonicalImage("/some/other/place/x.png", ROOTS)).toBeNull()
  })
})
