import { backupListingSchema, parseKeepStatus } from "../barman-output/barman-output.module.code.ts"
import type { BackupCandidate, KeepState } from "../keep-decision/keep-decision.module.code.ts"

export interface BarmanTarget {
  readonly endpointUrl: string
  readonly sourceUrl: string
  readonly serverName: string
}

async function runBarman(command: string, args: readonly string[]): Promise<string> {
  const proc = Bun.spawn([command, ...args], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited ${exitCode}: ${stderr.trim()}`)
  }
  return stdout
}

export async function listBackups(target: BarmanTarget): Promise<readonly BackupCandidate[]> {
  const stdout = await runBarman("barman-cloud-backup-list", [
    "--format",
    "json",
    "--endpoint-url",
    target.endpointUrl,
    target.sourceUrl,
    target.serverName,
  ])
  const listing = backupListingSchema.parse(JSON.parse(stdout))
  return listing.backups_list.map((entry) => ({
    backupId: entry.backup_id,
    beginTimeIso: entry.begin_time_iso,
    status: entry.status,
  }))
}

export async function readKeepState(target: BarmanTarget, backupId: string): Promise<KeepState> {
  const stdout = await runBarman("barman-cloud-backup-keep", [
    "--status",
    "--endpoint-url",
    target.endpointUrl,
    target.sourceUrl,
    target.serverName,
    backupId,
  ])
  return parseKeepStatus(stdout)
}

export async function markStandalone(target: BarmanTarget, backupId: string): Promise<undefined> {
  await runBarman("barman-cloud-backup-keep", [
    "--target",
    "standalone",
    "--endpoint-url",
    target.endpointUrl,
    target.sourceUrl,
    target.serverName,
    backupId,
  ])
}

export async function releaseKeep(target: BarmanTarget, backupId: string): Promise<undefined> {
  await runBarman("barman-cloud-backup-keep", [
    "--release",
    "--endpoint-url",
    target.endpointUrl,
    target.sourceUrl,
    target.serverName,
    backupId,
  ])
}
