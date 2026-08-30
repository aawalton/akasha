import type { Initiative } from "../initiative.page-type.ts"

export const amySeatSystem = {
  id: "01a04f23-d2da-7b6c-8806-d84d19f3938a",
  pageTypeSlug: "initiative",
  slug: "amy-seat-system",
  domainSlug: "domain/seat-system",
  personaSlug: "amy",
  parentSlug: "amy-akasha-alone",
  invariants: [
    {
      invariantKind: "gap",
      statement: "A seat page is written whole or not at all.",
    },
    {
      invariantKind: "gap",
      statement: "Every writer of a seat's uncommitted values goes through one lock.",
    },
    {
      invariantKind: "gap",
      statement: "A page property can carry a value the commit does not hold.",
    },
    {
      invariantKind: "gap",
      statement: "A page moves with the uncommitted values standing beside it.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change touching only uncommitted values lands without a commit and without the hold.",
    },
    {
      invariantKind: "gap",
      statement: "A moment is a value a page property can hold.",
    },
    {
      invariantKind: "gap",
      statement: "A closed set of values stands as pages.",
    },
    {
      invariantKind: "gap",
      statement: "A persona stands in the new system for a relation to reach.",
    },
    {
      invariantKind: "gap",
      statement: "A person, a role and an account stand as pages.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seat stands as a page the akasha system holds, under the id it already carries.",
    },
    {
      invariantKind: "gap",
      statement: "A seat's uncommitted values stand beside its page in the new system.",
    },
    {
      invariantKind: "gap",
      statement: "Every writer of a seat writes it to both systems.",
    },
    {
      invariantKind: "gap",
      statement: "Every reader of a seat reads it from the akasha system.",
    },
    {
      invariantKind: "gap",
      statement: "No writer of a seat writes it to the old system.",
    },
    {
      invariantKind: "gap",
      statement: "No seat stands in the old system.",
    },
    {
      invariantKind: "gap",
      statement: "The old readings attachment stands nowhere.",
    },
  ],
  notes: [
    "The intents above stand in the order they are to be taken, and their spine is one shape: make the new location, write to both, read from the new, stop writing the old, remove the old. Nothing may be read from the new system before it is written there, and nothing may stop being written to the old before every reader has moved. The intents standing before the seat page itself are what the new system must be able to do before a seat can stand in it at all: hold a value the commit does not carry, and land such a change without a commit or the repository hold. Counting a file in the worktree as present was taken to be the first of these and is not one at all. That rested on the naming grammar making any file beside a page a property's file, and the uncommitted file beside a page is instead a special case of that grammar, so no check ever asks a page for it. Until those stand there is nowhere valid to put twenty observed values that change every second.",
    "The first work taken against this initiative repointed six readers at the old system's colocated sidecar rather than at the new system. That was a move from committed to uncommitted inside the old frame, not a move between frames, and every one of those readers must move again. What survives it is the inventory: the readers are known, and a harness checks all six against every live seat. Repoint once, from the old page to the new page, and check with that.",
    "A seat's id is the agent's id. The reading record under `.git/data/reads` is keyed by it, and the directories standing there today are seat ids. A migration that reissues a seat's id discards every read that seat has recorded, and the gate refuses a body whose writer has no record of reading it. Ids carry over unchanged, or seats lose the ability to write at all.",
    "The seat page is written by a plain write with no lock and no rename, so a reader can see it half written. Every reader treats a malformed page as empty rather than as an error, so a torn read shows as a seat that does not exist. This stands today, with one writer, and is not something dual-writing would introduce. It is why the first intent is first.",
    "What a seat holds is either declared of it or observed of it, and the old system files each property under one or the other. The storage did not honour the split: the session uuid, the transcript path and the rotated session uuid were observed and stood on the committed page, so a session rotation rewrote and committed it. They now stand beside the old page with the other nine observed values, and what is left on it is identity and declarations, changing only when someone states them. That is a page in the new system's sense, and it is a smaller thing to move.",
    "Twenty of the seat's thirty-seven properties are observed rather than declared. Ten of them are ever written. Build the vocabulary for the ten and leave the rest until something writes them.",
    "The page changes about once an hour and the values beside it change about once a second. They are two problems that share a name, and the second is the one with no answer in the new system yet.",
    "Twenty-five hooks stand under `tools/hooks` that no settings file carries, and they fire never. The spawn settings are built from the new system's index alone, and the old pages name no event to run at, so the loader would refuse them even if it looked there. Two are safely superseded, five are partly covered, and sixteen are behaviour nothing else performs. Three of those losses bear on this domain. Nothing sets `ACTING_AGENT_ID` to a subagent's id any more, so a subagent's reads and writes are recorded against its parent seat. Nothing writes a seat's `active-turn` or `compacting` values, which `seat-show` still reads. And no session boundary expires a seat's read records. Restoring any of this is not work this initiative holds; what matters here is that a plan resting on those hooks rests on nothing. What writes the values beside a seat is the supervisor heartbeat, the model gateway and the usage reader.",
    "Every intent up to the seat standing as a page is reversible. That one is the first one-way door: once seats stand in the new system under their real ids, backing out means reconciling two live stores rather than deleting a file.",
    "The set of writers cannot be closed by reading this repository, because the page-serving daemon is not in it. Make the write safe rather than reasoning about who writes.",
    "A reader that cannot find a seat answers with nothing rather than refusing, all the way down through the id lookup, the page read and the value read. Three probes written against this work reported a clean wrong answer before they reported a true one, each time from a mistyped id or path. When the readers move to the akasha system that shape turns from rework into a fleet that reads as empty, so let the moved readers refuse a root they find no seat under.",
    "Where a seat page stands was spelled six times: the canonical Place, the hook reader, the shell reader the status line sources, the read record, the editor extension, and the `files:` line on the old page type. Four now share one constant in `agent/places.ts`; the shell and the page type still stand alone. The rest dies with the old location rather than being worth collapsing on its own, so it holds no intent here.",
  ],
} as const satisfies Initiative
