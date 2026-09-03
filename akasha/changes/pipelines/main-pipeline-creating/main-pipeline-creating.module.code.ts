import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  LOG,
  runBoundedMainPipelineCreatorTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@tools/lib/main-pipeline-creator/tick"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

const WRITER = "main-pipeline-creator"

async function main(): Promise<void> {
  process.env.AGENT_ID = WRITER
  process.env.ACTING_AGENT_ID = ""

  const ac = stopsOnSignal()

  const roots = resolveRoots()

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms`
  )

  while (!ac.signal.aborted) {
    try {
      await runBoundedMainPipelineCreatorTick(roots, ac.signal)
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleptUntilStopped(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}
