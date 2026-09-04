import type { Finding } from "../finding.page-type.ts"

export const aBunSpawnWithNoEnvKeyCannotSeeTheParentsEnvironmentEdits = {
  id: "01a06a0c-072d-70fb-b905-da25fbb6f92a",
  pageTypeSlug: "finding",
  slug: "a-bun-spawn-with-no-env-key-cannot-see-the-parents-environment-edits",
  domainSlug: "domain/akasha-migration",
  claim:
    "A control that seeds a fault by assigning to `process.env` and then spawning a child through `Bun.spawn` without an `env` key never reaches the child, so the arm passes and reads as agreement rather than as a dead instrument.",
  evidence:
    'Measured 2026-09-03 while repointing `supervisor-mcp` off `tools/playwright-storage-state.ts`.\n\nTHE MINIMAL CASE. One file: `process.env.LANE_PROBE_VAR = "mutated"`, then `Bun.spawn(["bash", "-c", "echo ${LANE_PROBE_VAR:-UNSET}"], { stdout: "pipe" })` answers `UNSET`. The same spawn with `{ env: process.env }` added answers `mutated`. So the default is the environment the process STARTED with, not `process.env` as it is at the call.\n\nHOW IT LIED HERE. `supervisor-mcp.module.code.ts` spawns the storage-state export with no `env` key. A control that set `process.env.BROWSER_TEST_URL` to an unresolvable host and then called `resolveMcpConfig` printed `re-exporting ... / re-exported and verified fresh` and exited 0 — identical to the live arm, in the same three log lines. Nothing in that output says the fault never arrived. The seeded fault was re-armed by putting the same variable in the probe process\'s STARTUP environment (`env BROWSER_TEST_URL=https://no-such-host-lane-probe.invalid bun probe.ts`), and the arm then threw `storage-state re-export failed (exit 70)`. Same code, same fault, one reaches the child and one does not.\n\nWHY IT IS WORTH FILING RATHER THAN FIXING. The seat system spawns loose and carried files this way in at least eight places, so any lane proving a spawned entry point still runs is one `process.env` assignment away from a control that cannot fail. The reading is not that `Bun.spawn` is wrong — it is that an env-seeded control has to be seeded before the process starts, or the `env` key has to be passed.\n\nWHAT IS NOT CLAIMED. Whether Node\'s `child_process.spawn` behaves the same was not measured, and neither was `Bun.spawnSync`. The check is one line and worth re-running rather than carried from here.',
} as const satisfies Finding
