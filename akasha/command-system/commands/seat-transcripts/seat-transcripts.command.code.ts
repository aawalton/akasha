import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { akashaSeatsThatExist } from "@tools/lib/seat-akasha-beside"
import { akashaSeatRecordOf } from "@tools/lib/seat-akasha-read"

const TRANSCRIPT_KEY = "transcript-path"

export interface SeatTranscript {
  readonly agentId: string
  readonly seatName: string
  readonly transcriptPath: string
}

// One value read off a seat, in the shape the seat readers answer it in. It is named here so the
// walk below can be driven by a seeded reader as well as by the real one: which seats stand, and
// what each of them holds, changes between one call and the next, so a check that asked the live
// fleet would agree with whatever it was handed and prove nothing about the walk.
export type Held = { readonly value: string } | null

export type Reading = (agentId: string, key: string) => Held

// WHERE EACH SEAT'S TRANSCRIPT STANDS, over the seats handed in. A seat holding no transcript, or
// holding an empty one, is left out rather than answered with an empty path: an empty path names
// a file, and the caller opening it would read the absence as a broken transcript rather than as
// a seat that has none yet.
export function transcriptsOver(
  seats: Iterable<readonly [string, string]>,
  reading: Reading
): readonly SeatTranscript[] {
  const found: SeatTranscript[] = []
  for (const [agentId, seatName] of seats) {
    const held = reading(agentId, TRANSCRIPT_KEY)
    if (held === null || held.value === "") continue
    found.push({ agentId, seatName, transcriptPath: held.value })
  }
  return found
}

// Every seat akasha holds at the moment of asking, each with where its transcript stands. A seat
// is named by the index and its transcript is read from the values kept beside its page, so a
// seat kept only in akasha is answered here like any other.
export function transcriptsNow(): readonly SeatTranscript[] {
  return transcriptsOver(akashaSeatsThatExist(), akashaSeatRecordOf)
}

// The whole of what goes back: one JSON object carrying a `seats` list, and nothing else.
export function saidOf(seats: readonly SeatTranscript[]): string {
  return JSON.stringify({ seats })
}

// THE ROOT IS NOT TAKEN FROM `given`, and that is on purpose. The seats are read from the akasha
// checkout `resolveRoots()` names, which is what the readers underneath reach on their own and
// what this verb reached before it was a command. `given.root` is the root the caller stood in,
// and handing it down here would move which fleet a call reads — so the caller's root is left
// where it is rather than passed to readers that do not take one.
export function seatTranscripts(argv: readonly string[], _given: Given): Answer {
  if (argv.length > 0) {
    const said = argv.map((one) => `\`${one}\``).join(", ")
    const are = argv.length === 1 ? "is no word this takes" : "are no words this takes"
    return { report: [], refusals: [`${said} ${are} — this command takes none`], code: 1 }
  }
  try {
    return { report: [saidOf(transcriptsNow())], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
