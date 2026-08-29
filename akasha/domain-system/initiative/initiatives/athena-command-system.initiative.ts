import type { Initiative } from "../initiative.page-type.ts"

export const athenaCommandSystem = {
  id: "01a04f75-342f-712d-813d-5f6f0ec063c9",
  pageTypeSlug: "initiative",
  slug: "athena-command-system",
  domainSlug: "domain/command-system",
  personaSlug: "athena",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The boundary a command holds is stated in one place rather than in each command.",
    },
    {
      invariantKind: "gap",
      statement: "What a command may land and what the checks judge are asked as two questions.",
    },
    {
      invariantKind: "gap",
      statement: "An agent write anywhere in the repository lands through the akasha commands.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change reaching nothing under `akasha/` is judged by no check and lands all the same.",
    },
    {
      invariantKind: "gap",
      statement: "A gate with nothing to judge is told apart from a gate that could not be built.",
    },
    {
      invariantKind: "gap",
      statement:
        "A move repoints every importer of what moved, inside the akasha folder and outside it.",
    },
    {
      invariantKind: "gap",
      statement: "A body is overwritten only where what stands there is what the writer read.",
    },
    {
      invariantKind: "gap",
      statement:
        "A landing commits only where nothing reaching `akasha/` landed since it read its base.",
    },
    {
      invariantKind: "gap",
      statement: "Two landings reaching different paths do not wait on each other.",
    },
    {
      invariantKind: "gap",
      statement: "No landing holds a lock, and the gate runs while none is held.",
    },
    {
      invariantKind: "gap",
      statement:
        "A hook guarding a write reaches the whole repository, not the akasha folder alone.",
    },
    {
      invariantKind: "gap",
      statement: "A widened guard is known to have reached the seats before it is relied on.",
    },
  ],
  notes: [
    "Capability comes before constraint. A guard widened before the commands can serve a path stops every seat with no way to comply, so the commands learn to land a path before any hook insists they must.",
    "The boundary is spelled today in read, move, remove and lint, each with its own constant and its own refusal. It is given one owner before it is moved, because a scope changed in four places drifts in four places.",
    "The reason is not tidiness. `move` already states the gap in its own words: the index carries `akasha/` alone, so a file outside it importing what moved stands unrepointed and was not looked for. Five files outside the folder import into it. One of them delivers every hook to every seat, and when an inner rename broke it the fleet ran unguarded until a registration check happened to be run.",
    "A change reaching nothing under `akasha/` was half of the last three hundred commits, so an empty patch is the common case rather than an edge. Telling nothing-to-judge apart from could-not-be-built is where a silent hole would open, and it is the same fault as reading a missing index as an index naming nothing.",
    "Reads and formatting stay bound to `akasha/` for now. Only the commit half has evidence behind it, and widening three disciplines at once would change the friction of every seat while only one of them is answering a fault we have seen.",
    "The landing lock goes before the reach widens, because a lock held across the gate would become a mutex over every agent write in the repository, and its hold time is a test run. It is also neither necessary nor sufficient: two landings reaching different paths cannot break the index agreeing with HEAD, and a write made outside the commands never takes it.",
    "HEAD answers what the lock was reaching for. A landing reads its base, is judged while holding nothing, and commits only if nothing reaching `akasha/` landed meanwhile. An intervening change outside the folder cannot alter a verdict, so it is no reason to refuse. The same rule already stands in `edit`, where a stated passage must still stand exactly once.",
    "Two things the lock covered are already safe and need nothing: an index entry file is written to a neighbour and renamed into place, which is atomic, and the commit names its paths so another agent's staging is never swept into it. What is left is a body overwritten between the reading and the writing.",
    "The new rule lands before the lock is taken away, never after. For a while both stand, which costs only waiting; the reverse would leave a window with neither.",
  ],
} as const satisfies Initiative
