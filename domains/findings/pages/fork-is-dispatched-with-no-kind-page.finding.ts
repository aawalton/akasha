import type { Finding } from "../finding.page-type.ts"

export const forkIsDispatchedWithNoKindPage = {
  id: "01a06dc2-4b27-7b44-bdd9-6e1d005492ab",
  pageTypeSlug: "finding",
  slug: "fork-is-dispatched-with-no-kind-page",
  domainSlug: "workspace-package/seat-system",
  claim:
    "A seat dispatches subagents as `fork`, and no subagent-kind page carries that name. Every kind page holds the name a seat dispatches it by in `dispatched-as`, so a subagent dispatched as `fork` reaches no kind page and its own page names no kind.",
  evidence:
    'Three subagent pages held `dispatchedAs: "fork"` on 2026-09-04. The first such value ever committed landed at 12:26 that day in f23578b0ed, cd256dc61f and 5477638c08, and 17 commits carry one. A census of every commit touching a subagent page before that hour found 7797 `general-purpose`, 3112 `Explore`, and no other value, so `fork` began inside one hour rather than being long present. `fork` is a builtin of the client: `compose-subagents` renders the `--agents` map from the `dispatched-as` of each kind page, and that map holds only `Explore` and `general-purpose`. Adding a `fork` kind page would put `fork` into the map every seat hands the client, which alters what the client is told rather than repairing what is recorded.',
} as const satisfies Finding
