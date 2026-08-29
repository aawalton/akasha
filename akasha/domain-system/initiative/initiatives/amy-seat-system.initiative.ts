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
      statement: "Every agent hook standing in the tree is one the spawn settings carry.",
    },
    {
      invariantKind: "gap",
      statement: "Where a seat page stands is spelled in one place.",
    },
    {
      invariantKind: "gap",
      statement: "The old readings attachment stands nowhere.",
    },
    {
      invariantKind: "gap",
      statement: "A page property can carry a value the commit does not hold.",
    },
    {
      invariantKind: "gap",
      statement: "A file a page property holds counts as present when it stands in the worktree.",
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
      statement: "Every reader of a seat reads it from the akasha system.",
    },
    {
      invariantKind: "gap",
      statement: "No seat stands in the old system.",
    },
  ],
  notes: [
    "The intents above stand in the order they are to be taken. The order is forced in three places and free everywhere else. Nothing later can begin before a seat page is written under one lock, because widening an unlocked write to two destinations widens the worst race in the system. Nothing in the migration can begin before a page property can hold a value the commit does not carry, because until then there is nowhere valid to put twenty observed values. And no reader can move before the location is spelled once, or four codebases must change together and two of them would not notice being wrong.",
    "A seat's id is the agent's id. The reading record under `.git/data/reads` is keyed by it, and the directories standing there today are seat ids. A migration that reissues a seat's id discards every read that seat has recorded, and the gate refuses a body whose writer has no record of reading it. Ids carry over unchanged, or seats lose the ability to write at all.",
    "The seat page is written by a plain write with no lock and no rename, so a reader can see it half written. Every reader treats a malformed page as empty rather than as an error, so a torn read shows as a seat that does not exist. This stands today, with one writer, and is not something dual-writing would introduce. It is why the first intent is first.",
    "Twenty of the seat's thirty-seven properties are observed rather than declared. Ten of them are ever written. Build the vocabulary for the ten and leave the rest until something writes them.",
    "The page changes about once an hour and the values beside it change about once a second. They are two problems that share a name, and the second is the one with no answer in the new system yet.",
    "The hooks standing under `tools/hooks` are carried by no settings file and fire never. What writes the values beside a seat is the supervisor heartbeat, the model gateway and the usage reader. Any plan resting on those hooks rests on nothing.",
    "Every intent up to the seat standing as a page is reversible. That one is the first one-way door: once seats stand in the new system under their real ids, backing out means reconciling two live stores rather than deleting a file.",
    "The set of writers cannot be closed by reading this repository, because the page-serving daemon is not in it. Make the write safe rather than reasoning about who writes.",
  ],
} as const satisfies Initiative
