import type { Initiative } from "../initiative.page-type.ts"

export const rynDomainLines = {
  id: "01a053a7-4bd2-7a2f-a7e4-d6b7ed099c7a",
  pageTypeSlug: "initiative",
  slug: "ryn-domain-lines",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "ryn",
  intents: [
    { statement: "A prompt run over a text by hand has its answers counted." },
    { statement: "Every prompt standing agrees with the cases Alan labelled for it." },
    { statement: "Every way a directive fails is named on the directive kind it fails as." },
    { statement: "Every way an invariant fails is named on the invariant kind it fails as." },
    { statement: "No invariant standing under akasha is a platitude." },
    {
      statement:
        "Akasha's domains carry an average of fewer than 50 characters of directive and invariant.",
    },
    { statement: "Alan has reviewed every directive and invariant standing under akasha." },
  ],
  constraints: [
    "The count is taken across the akasha folder alone.",
    "An entry is an object carrying `invariantKind` or `directiveKind`, and its characters are its prose fields alone.",
    "What an initiative holds is not counted.",
    "Alan is shown one thing at a time.",
    "A failure case a haiku model cannot detect is still written down, but only one it can detect can become a check.",
    "A subagent returns the text it proposes rather than writing it.",
    "The average is not a total because domains are expected to reach several thousand as the old system migrates in.",
    "If the documented failure cases run out while the average stands above fifty, it is raised with Alan rather than met by inventing one.",
  ],
} as const satisfies Initiative
