import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyTelnyxApproval = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-telnyx-approval",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Telnyx has verified the toll-free number Alan's harness texts from.",
      workingMemory:
        "Request 25418a34-7d8c-5304-af97-9679752f983c, Waiting For Customer since Aug 7, six denials behind it. Telnyx keeps one mutable reason per request, so four of those notes are gone for good. The rewritten submission is drafted beside this seat and waits on Alan to approve the PATCH; three critiques are reading it now. The opt-in form records again, HELP and START are answered by Telnyx itself, and the verification-status webhook answers 403 to an unsigned body.",
    },
  ],
  constraints: [
    "Nothing reaches Telnyx without Alan approving that call.",
    "Telnyx keeps one reason per request and overwrites it on resubmit, so a note not read now is lost.",
    "Every claim the submission makes is a claim about a running system that has to behave that way.",
    "A submission left unanswered inside Telnyx's editing window dies.",
  ],
} as const satisfies Initiative
