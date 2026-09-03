import { EXIT } from "@tools/lib/exit"
import { opsInvocationOf, opsSpelling } from "../ops-invocation/ops-invocation.module.code.ts"

function refuseDirectCommandRun(entryPath: string): undefined {
  const invocation = opsInvocationOf(entryPath)
  if (invocation === null) return
  process.stderr.write(
    `refused: ${entryPath} holds an ops command rather than a program — running the file loads it ` +
      `and never calls it, so nothing it was asked to do is done and the exit code says it was. ` +
      `Run \`${opsSpelling(invocation)}\` instead.\n`
  )
  process.exit(EXIT.INPUT)
}

refuseDirectCommandRun(process.argv[1] ?? "")
