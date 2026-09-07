export type LogsBound = "limit" | "since" | "unknown"

export type LogsDiagnostic =
  | { kind: "zero-result"; message: string }
  | { kind: "truncated"; message: string }
  | { kind: "window-clipped"; message: string }
  | { kind: "window-undetermined"; message: string }
  | null

export interface LogsDiagnosticArgs {
  command: string
  pod: string
  namespace: string
  since: string
  lineCount: number
  isDone: boolean
  limit: number
  olderLinesBeforeWindow: boolean | null
  retentionLabel: string
  otherNamespaces: readonly string[]
}

const NOT_ABSENCE = "finding nothing here is NOT evidence of absence."

export function chooseLogsDiagnostic(args: LogsDiagnosticArgs): LogsDiagnostic {
  const cmd = args.command
  const widen = `Widen --since (Loki retains ${args.retentionLabel}) to reach them.`

  if (args.lineCount === 0) {
    let message =
      `${cmd}: no log lines matched pod prefix "${args.pod}" in namespace ` +
      `"${args.namespace}" over the last ${args.since} (exit 0, empty output).`
    if (args.otherNamespaces.length > 0) {
      const [first] = args.otherNamespaces
      message +=
        ` Did you mean --namespace ${first}? Pod prefix "${args.pod}" has streams in: ` +
        `${args.otherNamespaces.join(", ")}.`
    }
    if (args.olderLinesBeforeWindow === true) {
      message +=
        ` BOUNDED OUTPUT — this pod DOES have matching lines older than the --since` +
        ` window, so the window is what emptied this result, not the absence of logs.` +
        ` ${widen} An empty result here is NOT evidence of absence.`
    } else if (args.olderLinesBeforeWindow === null) {
      message +=
        ` BOUNDED OUTPUT (undetermined) — could not check whether older lines exist` +
        " outside the --since window, so this empty result is NOT evidence of absence."
    }
    return { kind: "zero-result", message }
  }

  if (!args.isDone) {
    return {
      kind: "truncated",
      message:
        `${cmd}: BOUNDED OUTPUT — hit the --limit of ${args.limit} line(s) before covering ` +
        `the --since window (${args.since}); older lines within the window were dropped. ` +
        `This is a tail window, not the whole log: ${NOT_ABSENCE} ` +
        "Use --all for the whole window, --json to paginate via the returned cursor, or a " +
        "wider --since to reach further back.",
    }
  }

  if (args.olderLinesBeforeWindow === true) {
    return {
      kind: "window-clipped",
      message:
        `${cmd}: BOUNDED OUTPUT — matching lines exist older than the --since window ` +
        `(${args.since}) and were excluded. This is a time slice, not the whole log: ` +
        `${NOT_ABSENCE} ${widen}`,
    }
  }

  if (args.olderLinesBeforeWindow === null) {
    return {
      kind: "window-undetermined",
      message:
        `${cmd}: BOUNDED OUTPUT (undetermined) — could not check whether matching lines ` +
        `exist older than the --since window (${args.since}), so this output may be ` +
        `incomplete and ${NOT_ABSENCE}`,
    }
  }

  return null
}

export function describeBounds(args: { isDone: boolean; olderLinesBeforeWindow: boolean | null }): {
  complete: boolean
  boundedBy: readonly LogsBound[]
} {
  const boundedBy: LogsBound[] = []
  if (!args.isDone) boundedBy.push("limit")
  else if (args.olderLinesBeforeWindow === true) boundedBy.push("since")
  else if (args.olderLinesBeforeWindow === null) boundedBy.push("unknown")
  return { complete: boundedBy.length === 0, boundedBy }
}
