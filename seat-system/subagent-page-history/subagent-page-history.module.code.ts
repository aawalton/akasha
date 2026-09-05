import { told } from "@akasha/git/git-running"
import { loadedFrom } from "@akasha/pages/page-value"

// WHAT A SUBAGENT'S PAGE SAID BEFORE THAT PAGE WENT. A subagent's page is taken away the moment the
// subagent stops, so a subagent coming back has nothing on disk to read itself out of. The commit
// that last wrote the page holds every value the page carried, and this reads that one commit.
//
// THE SEAT'S OWN READER COULD NOT BE CALLED FOR THIS. `seat-akasha-history` indexes every seat page
// git has ever held, at one `git show` for each path, and holds the answer for the life of the
// call. That is 17 paths for seats and 657 for subagents, and a put-up runs at every SubagentStart
// rather than once a session. What is wanted here is one page rather than all of them, and the path
// that page sits at is worked out from the call already, so git is asked for that path alone: one
// log and one show, 178ms against this repository.

const AGENT_ID = "agentId"

export interface PageInHistory {
  readonly commit: string
  readonly path: string
  readonly values: Record<string, unknown>
}

// A REMOVAL IS LEFT OUT, because what a removal holds is the absence. The body before it is the
// last thing the page said, and that is the commit `--diff-filter=AM` picks.
export function pageInHistory(root: string, at: string): PageInHistory | null {
  if (at === "") return null
  const said = told(root, ["log", "--diff-filter=AM", "-n", "1", "--format=%H", "--", at])
  const commit = said === null ? "" : said.trim()
  if (commit === "") return null
  const text = told(root, ["show", `${commit}:${at}`])
  if (text === null || text === "") return null
  const held = loadedFrom(text)
  if (held.failed !== null || held.value === null) return null
  return { commit, path: at, values: held.value as Record<string, unknown> }
}

// A PATH THAT RESOLVES CAN HOLD THE WRONG PAGE. A subagent's page is named for its seat and for the
// id the subagent runs under, and a seat's name outlives the agent ids that have sat in it, so the
// newest body at a path is not always the page of the agent asking after it. What settles it is the
// agent id the body itself states, and a body stating another one is answered as nothing.
export function subagentPageInHistory(
  root: string,
  at: string,
  agentId: string
): PageInHistory | null {
  if (agentId === "") return null
  const held = pageInHistory(root, at)
  if (held === null) return null
  return held.values[AGENT_ID] === agentId ? held : null
}
