import type { Question } from "../question.page-type.ts"

export const yourNeverPassTwoImagesToNanoRuleKeepItBluntOrRef = {
  id: "019f993b-9cb5-7abe-9362-80b09f846baa",
  pageTypeSlug: "question",
  slug: "your-never-pass-two-images-to-nano-rule-keep-it-blunt-or-ref",
  ask: 'Your "never pass two images to Nano" rule — keep it blunt, or refine it? The log says the discriminator is the prompt\'s scope, not the image count.',
  askedBy: "sophia",
  askedIn: "019f6a56-476e-7088-aead-6f8f8920ae4b",
  status: "answered",
  offered: [
    "Keep it blunt — never two images, even though it forbids Grace's technique",
    "Refine — two images fine for small local edits, never for wholesale background replacement",
    "Test it first — run one controlled two-image local edit before changing doctrine",
  ],
  answer:
    "Keep it blunt, Nano works best with a single reference image with the identity and instructions for what to change. It does perfectly well at preserving identity, even across multiple edits.",
  closedAt: "2026-07-25T12:26:53.613Z",
  context: "txt",
} as const satisfies Question
