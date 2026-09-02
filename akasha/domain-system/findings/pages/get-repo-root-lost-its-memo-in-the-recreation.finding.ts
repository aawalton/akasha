import type { Finding } from "../finding.page-type.ts"

export const getRepoRootLostItsMemoInTheRecreation = {
  id: "01a06291-b404-7482-bf56-684ef0746225",
  pageTypeSlug: "finding",
  slug: "get-repo-root-lost-its-memo-in-the-recreation",
  domainSlug: "domain/temper",
  claim:
    "`getRepoRoot` kept its answer in a module-level `let` and returned it on every later call. The memo did not come across into akasha, because a module-level mutable value is what `no-global-in-a-module` is about. Each call now re-reads the environment and re-tests the lockfile, so a run asking many times does one `existsSync` per ask rather than one in total.",
  evidence:
    "Measured 2026-09-02 while moving `temper/shared-build-deploy-checks/src/lib/repo-root.ts` to `akasha/temper/temper-build-deploy-checks/repo-root/`, landed at a1b04a5aaa.\n\nThe temper body held `let cached: string | null = null` at module scope, returned `cached` when it was not null, and assigned it after validating. The landed body holds neither line and returns `root` directly. The diff is three lines gone and one changed.\n\nWhat it costs is one `existsSync` on `<root>/bun.lock` per call rather than one per process. Twelve of the package's modules import `getRepoRoot`, and each of those reads it once at the top of its own entry point, so the measured cost today is under a dozen extra stat calls across a whole check run. That is why the memo went rather than being rebuilt as a page-shaped cache.\n\nIt is filed because it is a real behavioural difference and not merely a formatting one: a caller that mutated `process.env.WORKSPACE` between two calls got the first answer twice from temper and gets two different answers from akasha. Nothing in the package does that today. Whoever writes a test that does will meet the change here rather than in the diff.\n\nThe same recreation also turned three arrow-function consts in `cli-args` into function declarations and two interfaces into type aliases, which are shape changes with no behavioural difference; those are not filed.",
} as const satisfies Finding
