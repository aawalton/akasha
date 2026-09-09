import type { Finding } from "../finding.page-type.types.ts"

export const aSweptSubagentLeavesItsKeptEditsOnDiskWhereNothingReachesThem = {
  id: "01a087b7-92f3-7f08-a322-4e6b60b67cbe",
  pageTypeSlug: "finding",
  slug: "a-swept-subagent-leaves-its-kept-edits-on-disk-where-nothing-reaches-them",
  domain: "workspace-package/agent",
  claim:
    "A sweep takes a subagent's page away and leaves the edits that subagent kept beside it. The seat is still told of them and can still take them, but that subagent can no longer reach them or add to them, and edits no seat takes gather with nothing to end them.",
  evidence:
    "Eight such files sit under seat-system/subagents/pages with no page beside them, across four personas. A swept subagent's own list and draft calls are both refused, because the tooling reaches edits through the page. The seat's apply still names them and a take still reaches them: seventeen were recovered that way after the page went. `agent-subagent-sweep` removes the page path alone and states no invariant about edits. `subagent-presence` states that nothing is taken in beside a page that goes, while `file-property` states that a file property's value goes when its page goes. Both cannot hold.",
} as const satisfies Finding
