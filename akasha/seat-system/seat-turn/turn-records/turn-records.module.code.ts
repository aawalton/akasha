import type { SeatRecord } from "@tools/lib/seat-record"

export type TurnRecord = SeatRecord

// THESE THREE STAND NOWHERE AND SAY SO. Akasha declares no property for any of them, so the write
// had nowhere to land once the old store stopped being written; the reads have answered null since
// the reads moved to akasha, a step earlier.
//
// NOTHING WRITES THEM EITHER. `agents.agent-settings.harness-settings.json` registers exactly one
// hook, `block-ops-cli`. The two inference hooks that reach `turn-end-decide` — where `stopped` is
// the one value any of these ever carries that the readers do not already assume — are
// unregistered, as are all six agent hooks. What is left calls `setTurnState(agent, "idle")`, and
// `stampIn` reads a missing stamp as `idle` too, so even a landed write would say what its absence
// already says.
//
// So this is not a value being lost. It is a record nobody keeps, described as one.
//
// IT IS SPELLED OUT HERE RATHER THAN LEFT TO FAIL BENEATH. Left alone, every call went on reaching
// `keepBeside`, which now refuses a key akasha carries nothing for — a throw raised and swallowed
// once per key per beat per seat. That throw is what leaked into a live agent's terminal when the
// refusal was briefly said aloud. A record nobody keeps should cost nothing to not keep.
//
// The way back is the same for all three: register the hooks, declare the property on the seat page
// type in akasha, name it in `CARRIED`, and restore these bodies. The middle step is the one with
// no gate on it — see `seat-system`'s upkeep invariant.
export function turnEndReadingOf(_agent: string): TurnRecord | null {
  return null
}

export function setTurnEndReading(_agent: string, _value: string): void {}

export function turnStateOf(_agent: string): TurnRecord | null {
  return null
}

export function setTurnState(_agent: string, _value: string): void {}

export function turnPendingSourceOf(_agent: string): TurnRecord | null {
  return null
}

export function setTurnPendingSource(_agent: string, _value: string): void {}

function keptLine(label: string, recorded: TurnRecord | null, absent: string): string {
  const said =
    recorded === null ? absent : `${recorded.value} (read ${new Date(recorded.at).toISOString()})`
  return `  ${label.padEnd(8)} ${said}`
}

export function turnEndReadingLine(recorded: TurnRecord | null): string {
  return keptLine("reading", recorded, "— no turn end read")
}

export function turnPendingSourceLine(recorded: TurnRecord | null): string {
  return keptLine("source", recorded, "— no turn end measured")
}
