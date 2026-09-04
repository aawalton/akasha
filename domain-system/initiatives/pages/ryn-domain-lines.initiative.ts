import type { Initiative } from "../initiative.page-type.ts"

export const rynDomainLines = {
  id: "01a053a7-4bd2-7a2f-a7e4-d6b7ed099c7a",
  pageTypeSlug: "initiative",
  slug: "ryn-domain-lines",
  domainSlug: "workspace-package/domain-system",
  personaSlug: "ryn",
  intents: [
    {
      statement: "Every construction akasha writes is parsed by the grammar.",
      workingMemory:
        "Nine more shapes took plain from 2043 of 3551 to 2074, and refusals the grammar cannot read from 541 to 499. Counting refusals by the word a parse stopped at finds what the grammar lacks. Sharper: over the sentences the grammar already admits, list every tag assignment allowing a parse, drop any sentence hitting the cap, and rank the words forced into a verb slot. A cluster there is a rule the grammar lacks and is faking.",
    },
    {
      statement: "Every sentence shape the grammar parses carries a decision.",
      workingMemory:
        "Four shapes refused, none allowed, 48 undecided. Alan approves only allowing, and holds that no simpler rewrite is necessary but not sufficient, so approvals wait on criteria he has not named yet. Mine for clearly wrong shapes instead. Every defect so far was a rule too loose, firing on a wrong analysis and hiding a missing rule. One parse tree settles nothing, because the grammar may hold the right analysis as well; what settles it is that no tag assignment at all is the right one.",
    },
    { statement: "A sentence the grammar refuses names a shape it is refused for." },
    { statement: "A change writing a sentence the grammar refuses does not land." },
    { statement: "Every invariant under akasha is written in plain language." },
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
    "A sentence shape is put to Alan only where it is proposed for acceptance.",
    "The average is not a total because domains are expected to reach several thousand as the old system migrates in.",
    "If the documented failure cases run out while the average stands above fifty, it is raised with Alan rather than met by inventing one.",
  ],
} as const satisfies Initiative
