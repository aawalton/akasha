import type { Finding } from "../finding.page-type.ts"

export const fiveLiveCallSitesSpawnAnOpsCliToolThatIsNoLongerOnDisk = {
  id: "01a06583-579e-705f-a88b-e26ec07498f8",
  pageTypeSlug: "finding",
  slug: "five-live-call-sites-spawn-an-ops-cli-tool-that-is-no-longer-on-disk",
  domainSlug: "domain/akasha-migration",
  claim:
    "`tool-argv.ts` maps the six ops-cli tool names onto paths under an `ops-cli` folder that is gone. Five live call sites pass those names, so each spawns a file that is not there and reads the failure as a refused write rather than as a missing tool. One of the five is reached by the running messages MCP server.",
  evidence:
    "Measured 2026-09-02 at commit b9c6dfc850.\n\n`tools/lib/tool-argv.ts` lines 4 to 11 hold `IN_AKASHA`, six entries mapping `write.ts`, `edit.ts`, `rm.ts`, `mv.ts`, `replace.ts` and `search.ts` onto `ops-cli/global/<name>/<name>.command.code.attachment.ts`, and `toolArgv` prefixes `akashaRoot()`. Calling it here answered `/var/home/walton/repos/akasha/ops-cli/global/write/write.command.code.attachment.ts` for `write.ts`, and the matching paths for `edit.ts` and `rm.ts`. `existsSync` answered false for all three. No `ops-cli` folder is on disk at the repository root or under `akasha/`.\n\nFive live call sites pass a mapped name: `tools/lib/message-file.ts` line 181 (`write.ts`) and line 304 (`rm.ts`), `tools/lib/page-seq.ts` line 96 (`edit.ts`), `monarch/land-files.ts` line 294 (`write.ts`), and `services/sweep-log-days.ts` line 109 (`rm.ts`). `message-file.ts` is reached from `tools/lib/messages-mcp.ts`, which is running.\n\nEach caller spawns the missing path and takes the non-zero exit as a refusal, so the break reads as a refused write rather than as a tool that is not there. Nothing says the file was missing.\n\n`tools/lib/gated-landing.ts` was the sixth such caller and was repaired at 4b79e2d142 by calling `landedMechanically` from `@akasha/command-system/asking` in process rather than spawning anything. That repair fits the other five in shape, but each mapped name answers to a different akasha command with its own flags, so none of the five is a mechanical repoint of a path.",
} as const satisfies Finding
