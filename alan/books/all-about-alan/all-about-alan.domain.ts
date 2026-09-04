import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const allAboutAlan = {
  id: "01a0119c-fe6b-7000-8269-8d4b8edbed7b",
  pageTypeSlug: "domain",
  slug: "all-about-alan",
  definition: "the notes on who Alan is",
  partSlugs: [
    "page-type/all-about-alan-experiment",
    "page-type/all-about-alan-model",
    "page-type/all-about-alan-topic",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notes are part of Alan rather than a description of Alan.",
    },
    {
      invariantKind: "absence",
      statement: "The notes hold no queue of subjects to work through.",
    },
    {
      invariantKind: "departure",
      statement: "A loose end is a finding.",
    },
    {
      invariantKind: "departure",
      statement: "A change here lands without Alan's review.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Authorship",
      act: "Never write a claim about Alan he has not made.",
      warrant:
        "An invented sentence looks like one he said, so it reads as fact and nobody checks it again.",
      aids: [
        "Write what he said, never what it implies.",
        "Mark your own reading and you may write it.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Voice",
      act: "Write every note in Alan's first person.",
      warrant:
        "A third-person note carries the same facts, so nothing but the voice shows it is not his.",
      aids: [
        "Convert every sentence, not just what he said.",
        "Your own marked reading stays in your voice.",
      ],
    },
  ],
} as const satisfies Domain
