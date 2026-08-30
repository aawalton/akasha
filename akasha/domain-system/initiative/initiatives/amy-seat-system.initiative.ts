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
      statement: "A moment is a value a page property can hold.",
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
    "The intents above stand in the order they are to be taken, and their spine is one shape: make the new location, write to both, read from the new, stop writing the old, remove the old. Nothing may be read from the new system before it is written there, and nothing may stop being written to the old before every reader has moved. What the new system had to be able to do before a seat could stand in it at all is now done: a store beside the page holds values the commit does not carry, and it takes a lock keyed on that one file so writers owning different keys never lose one another's. Counting a file in the worktree as present was taken to be the first of these and is not one at all. That rested on the naming grammar making any file beside a page a property's file, and the uncommitted file beside a page is instead a special case of that grammar, so no check ever asks a page for it. Nothing stands before the seat page now.",
    "Three intents came off this spine when the seat page type was written, and none of them is done. A closed set of values standing as pages, a persona standing for a relation to reach, and a person, a role and an account standing as pages are each now written where they bite, as a gap on the property that had to be degraded to text. Assignment, role, person, start mode and registration account each say plainly what relation they should be and why they are not one yet. An intent is written on a domain or on an initiative and never both, so they stand there rather than here, and whoever writes those pages meets them without reading this. The moment stays an intent because a page property holding a moment is something the pages system lacks rather than something one seat property wants. It moved after the writers, because the values land without it: turn-pending drops when each of its flags was observed, and that cost was taken deliberately.",
    "A change touching only uncommitted values landing without a commit and without the hold was an intent until it was tested. The gate refuses such a file outright, no page claiming it, and so never reaches the hold or the commit at all. The store beside the page writes it instead: no landing, nothing to commit, and a lock keyed on the one file. The one argument for routing it through the gate was that a malformed file beside a page would break the typecheck for everyone on the machine, and that is false. No tsc project covers the akasha folder, and the typecheck check builds its program from the import graph rooted at what changed, which never reaches a file nothing imports and nothing indexes.",
    "The first work taken against this initiative repointed six readers at the old system's colocated sidecar rather than at the new system. That was a move from committed to uncommitted inside the old frame, not a move between frames, and every one of those readers must move again. What survives it is the inventory: the readers are known, and a harness checks all six against every live seat. Repoint once, from the old page to the new page, and check with that.",
    "A seat's id is the agent's id. The reading record under `.git/data/reads` is keyed by it, and the directories standing there today are seat ids. A migration that reissues a seat's id discards every read that seat has recorded, and the gate refuses a body whose writer has no record of reading it. Ids carry over unchanged, or seats lose the ability to write at all.",
    "The seat page is written whole already. Every write of it goes through the gated write command, which lands the body temp-and-rename under a lock in `repo/land/land.ts`, and the seat writer composes the whole body before it calls. An intent stood here saying the page was written plainly with no lock and no rename, and that was read off the wrong writer and believed for as long as it stood. The one page-body writer in the old system that is not atomic is `rewritten` in `tools/lib/page-write-text.ts`, reached only through `patchPageIfMatch`, and even that runs under a lock, though a plain reader takes none.",
    "Dual-writing is a change in two places rather than in every writer. Every seat page write in this repository goes through `writeSeatPage` in `tools/lib/seat-page.ts`, which three callers use, and every value written beside a seat goes through the patch and drop wrappers in `page/uncommitted/uncommitted.ts`, which ten seat callers use. Change those two and this repository writes both places. Two things stand outside that: anything writing a seat from outside this repository, and the removers. `removeUncommitted` takes no lock, and `services/sweep-seat-pages.ts` deletes sidecars with a bare `rmSync` that never enters the module at all.",
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
