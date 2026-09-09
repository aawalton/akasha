import type { Finding } from "../finding.page-type.ts"

export const aSweptSubagentLeavesItsKeptEditsOnDiskWhereNothingReachesThem = {
  id: "01a087b7-92f3-7f08-a322-4e6b60b67cbe",
  pageTypeSlug: "finding",
  slug: "a-swept-subagent-leaves-its-kept-edits-on-disk-where-nothing-reaches-them",
  domain: "workspace-package/agent",
  claim:
    "A sweep takes a subagent's page away and leaves the edits that subagent kept beside it, saying nothing. The tooling reaches those edits through the page, so once the page goes a seat can neither take them nor drop them.",
  evidence:
    "Seven such files sit under seat-system/subagents/pages with no page beside them, holding 1609 edits between them. The largest holds 1319 and the next 250, across four personas. `agent-subagent-sweep` removes the page path alone and states no invariant about edits. `subagent-presence` states that nothing is taken in beside a page that goes, while `file-property` states that a file property's value goes when its page goes. Both cannot hold.",
} as const satisfies Finding
