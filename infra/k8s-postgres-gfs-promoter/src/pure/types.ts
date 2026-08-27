export type KeepState = "nokeep" | "standalone" | "full"

export interface BackupCandidate {
  readonly backupId: string
  readonly beginTimeIso: string
  readonly status: string
}

export interface DecideKeepInput {
  readonly backups: readonly BackupCandidate[]
  readonly keepStates: Readonly<Record<string, KeepState>>
  readonly todayUtc: string
  readonly weeklyKeepCount: number
  readonly monthlyKeepCount: number
}

export type KeepAction =
  | { readonly kind: "mark-standalone"; readonly backupId: string; readonly reason: string }
  | { readonly kind: "release"; readonly backupId: string; readonly reason: string }

export type KeepDisagreement =
  | {
      readonly kind: "backup"
      readonly backupId: string
      readonly found: KeepState
      readonly message: string
    }
  | {
      readonly kind: "missing-anchor"
      readonly periodKind: "weekly" | "monthly"
      readonly periodKey: string
      readonly message: string
    }

export interface DecideKeepResult {
  readonly actions: readonly KeepAction[]
  readonly weeklyAnchors: readonly string[]
  readonly monthlyAnchors: readonly string[]
  readonly disagreements: readonly KeepDisagreement[]
}

export interface GfsAlertEnvelope {
  readonly wedge_class:
    | "gfs-promoter-disagreement"
    | "backup-longtail-failure"
    | "backup-longtail-capacity"
  readonly state: "new"
  readonly evidence: Readonly<Record<string, unknown>>
  readonly snapshot_at: string
}
