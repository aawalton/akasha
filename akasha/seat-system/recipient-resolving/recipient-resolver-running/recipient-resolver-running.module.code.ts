import { listPersonaSlugs, listPersonaWakeSources } from "@akasha/persona-system/persona-targets"
import {
  recipientResolverConfigBanner,
  resolveRecipientResolverConfig,
} from "@akasha/seat-system/recipient-resolver-config"
import { defaultRecipientResolverDeps } from "@akasha/seat-system/recipient-resolver-deps"
import { assembleRecipientResolverSpecs } from "@akasha/seat-system/recipient-resolver-registry"
import { runRecipientResolverTick } from "@akasha/seat-system/recipient-resolver-tick"
import { listPersonHandlers } from "@tools/lib/person-handler-slugs"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  const config = resolveRecipientResolverConfig()

  const effects = defaultRecipientResolverDeps(ac.signal, config)

  console.log(recipientResolverConfigBanner(config))
  console.log(
    `recipient-resolver: starting tick loop pid=${process.pid} specs=dynamic (per-tick persona enumeration + explicit statics)`
  )

  while (!ac.signal.aborted) {
    try {
      const specs = await assembleRecipientResolverSpecs(
        listPersonaSlugs,
        listPersonaWakeSources,
        listPersonHandlers
      )
      await runRecipientResolverTick({ specs, ...effects })
    } catch (err) {
      console.error("recipient-resolver: tick threw:", err)
    }
    const slept = await sleptUntilStopped(config.tickMs, ac.signal)
    if (!slept) break
  }

  console.log("recipient-resolver: stopping")
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("recipient-resolver fatal:", err)
    process.exit(1)
  })
}
