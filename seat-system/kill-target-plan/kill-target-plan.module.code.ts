export type KillTargetSource = "seat-page" | "proc"

export type KillTarget =
  | { kind: "signal"; pids: readonly number[]; source: KillTargetSource }
  | { kind: "session"; name: string }
  | { kind: "reconcile" }

export interface KillTargetInput {
  readonly supervisorPid: number | null
  readonly supervisorStands: boolean
  readonly procPidsForId: readonly number[]
  readonly seatName: string | null
  readonly selfPid: number
}

export function decideKillTarget(input: KillTargetInput): KillTarget {
  const { supervisorPid, supervisorStands, procPidsForId, seatName, selfPid } = input
  const procTargets = procPidsForId.filter((pid) => pid !== selfPid)

  if (
    supervisorPid !== null &&
    supervisorStands &&
    procPidsForId.includes(supervisorPid) &&
    procTargets.length > 0
  ) {
    return { kind: "signal", pids: procTargets, source: "seat-page" }
  }

  if (procTargets.length > 0) {
    return { kind: "signal", pids: procTargets, source: "proc" }
  }

  if (seatName !== null) {
    return { kind: "session", name: seatName }
  }

  return { kind: "reconcile" }
}
