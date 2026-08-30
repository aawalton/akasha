import type { Initiative } from "../initiative.page-type.ts"

export const rynDomainLines = {
  id: "01a053a7-4bd2-7a2f-a7e4-d6b7ed099c7a",
  pageTypeSlug: "initiative",
  slug: "ryn-domain-lines",
  domainSlug: "domain/domain-system",
  personaSlug: "ryn",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The check over invariant statements is named for both rules it holds.",
    },
    {
      invariantKind: "gap",
      statement: "A prompt is run over a text by hand, and its answers counted.",
    },
    {
      invariantKind: "gap",
      statement: "Every prompt standing agrees with the cases Alan labelled for it.",
    },
    {
      invariantKind: "gap",
      statement: "Every way a directive fails is named on the directive kind it fails as.",
    },
    {
      invariantKind: "gap",
      statement: "Every way an invariant fails is named on the invariant kind it fails as.",
    },
    {
      invariantKind: "gap",
      statement:
        "Akasha's domains carry an average of fewer than 50 characters of directive and invariant.",
    },
    {
      invariantKind: "gap",
      statement: "Alan has reviewed every directive and invariant standing under akasha.",
    },
  ],
  notes: [
    "The work goes one failure case at a time rather than one intent at a time. For each: say why the entry is bad, write that on the kind it fails as, test whether a haiku subagent detects it, have a subagent apply it, then read what came back. Each lands when it is done rather than waiting on the rest, as `Land In Pieces` says. The count falls as a consequence of that loop rather than as a step in it, so no pass is ever made over the corpus to reach a number.",
    "The first failure case is a departure a reader would guess right, taken first because departures are three quarters of every invariant standing, and because the kind already defines itself as what a reader would not guess, so the standard is written and only unenforced. Testing it needs a model and no model check runs yet, so the machinery is built here: a model test stating a prompt and its hand-labelled cases, run by hand from a command. The check that composes tests waits until a prompt is known to discriminate, because a composition layer built around a prompt that fails is work done twice. That machinery is nimue's to carry once it stands, and is built here only because this initiative needs it first.",
    "Alan is shown one thing at a time: one statement, one issue, one fix. That paces how a failure case is agreed, not how it is applied. Once he has seen examples of a category and agreed the fix, the rest of that category lands without him reading each change. `Every Changed Line` allows this already, so nothing here stands as an exception to it: showing examples of a category is showing the mechanism, and a wide change is what a release is for. He reads the failure cases one at a time as well, because a set of them fits his attention no better than it fits an agent's context.",
    "An agent may read every statement at once. All of them together are around 36,000 tokens, which is one context rather than an audit, and reading them whole is how a duplicate or a rule written twice is found at all. What an agent may not do is write. A subagent returns the text it proposes, and the change is applied here once the failure case behind it is agreed.",
    "A failure case a haiku model cannot detect is still written down, but only one it can detect can become a check. The detection test doubles as the cases such a check would state. Nothing here builds that check: the model check page type, its cases, and the gateway it reaches a model through are all intents of nimue-model-checks, and writing them here would put one intent in two places. So the failure cases are left in the shape that initiative will want, and this one closes without them running anywhere.",
    "At the start akasha's domains carried an average of 421 characters of directive and invariant each, over 343 domains. Fifty is the target because it is roughly a tenth of that today. An entry is an object carrying `invariantKind` or `directiveKind`, and its characters are its prose fields alone. What an initiative holds is not counted, because an initiative is mortal and its intents go when they are met. An average is deliberately not a total: domains are expected to reach several thousand as the old system migrates in, and an average breathes with that where a total would come to demand three characters a domain. The cost of that choice is that the number falls as domains arrive, so a fall is not by itself the work being done. If the documented failure cases run out while the average still stands above fifty, the number is not met by inventing a failure case to justify the rest. It is raised with Alan and settled then.",
    "The count is taken across the akasha folder alone. `Measure The Whole Repo` on akasha-migration forbids that for a rule's reach, and this narrowing is a deliberate exception to it rather than a reading of it. The old system holds around 92,000 characters of the same doctrine across 720 domain pages, and that doctrine migrates in, so the ceiling can be blown by migration doing its work rather than by anyone writing badly. Whoever meets that files a finding rather than treating the count as failed.",
    "`no-why-in-a-statement` was named for the one rule it held at landing. It grew a second: a statement holding two facts is refused as one saying why is, a semicolon among the markers that join them. Half its refusals now fall under a name that does not cover them, and a check nobody can read the reach of off the index is one every agent has to open to obey. The rename waits until the agents remediating against it have finished, because the path they verify through is the one it would move.",
    "`An agent writes a domain's lines as well as Alan would.` stood as a gap on the domain page type and was deleted when this initiative was written, ruled impossible rather than merely unmet. Alan's reading here is the work that gap hoped to make unnecessary. When these intents are met the reading intent is deleted rather than returned to a domain, because `Every Changed Line` already covers every line written after.",
  ],
} as const satisfies Initiative
