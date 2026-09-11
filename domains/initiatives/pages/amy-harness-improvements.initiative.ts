import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's harness sends text messages over the Telnyx number.",
      workingMemory:
        "Six denials, on toll-free verification rather than 10DLC. The Jul 16 reviewer asked for home, contact with address and email, products/services, about, contact-us and privacy/terms; `alan/web/routes` now carries all of them, so find whether denials continued after that before rebuilding the same checklist elsewhere. One submission died inside Telnyx's editing window. Alan's plan is a plain site on a quieter domain; `clear-the-world.com` is owned but has no site.",
    },
  ],
} as const satisfies Initiative
