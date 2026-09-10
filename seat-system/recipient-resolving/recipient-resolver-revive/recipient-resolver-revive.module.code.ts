import { resumeSeat } from "@akasha/seat-system/seat-resume"
import type { ReviveVerifySignal } from "@akasha/seat-system/seat-revive-verify-signal"
import { LOG } from "../../supervising/supervisor-config/supervisor-config.module.code.ts"
import type { RecipientResolverConfig } from "../recipient-resolver-config/recipient-resolver-config.module.code.ts"

function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new Error(`assertNever: unhandled variant ${rendered}`)
}

const REVIVE_OUTRAN = Symbol("revive-outran-the-timeout")

type Came =
  | { readonly kind: "back" }
  | { readonly kind: "wedged"; readonly detail: string }
  | { readonly kind: "failed"; readonly detail: string }

export async function reviveSeat(
  agentId: string,
  bootPrompt: string | undefined,
  config: RecipientResolverConfig
): Promise<ReviveVerifySignal> {
  if (config.dryRun) {
    console.log(`${LOG} recipient-resolver: [dry-run] would revive ${agentId} (nothing is called)`)
    return "benign"
  }

  const came: Promise<Came> = resumeSeat({
    agentId,
    verify: true,
    bootPrompt: bootPrompt !== undefined && bootPrompt.length > 0 ? bootPrompt : undefined,
  }).then(
    (back): Came =>
      back.kind === "wedged"
        ? {
            kind: "wedged",
            detail: `io did not advance past the revive within ${back.graceMs}ms`,
          }
        : { kind: "back" },
    (err: unknown): Came => ({
      kind: "failed",
      detail: err instanceof Error ? err.message : String(err),
    })
  )

  let timer: ReturnType<typeof setTimeout> | undefined
  let settled: Came | typeof REVIVE_OUTRAN
  try {
    settled = await Promise.race([
      came,
      new Promise<typeof REVIVE_OUTRAN>((resolve) => {
        timer = setTimeout(() => resolve(REVIVE_OUTRAN), config.reviveTimeoutMs)
      }),
    ])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }

  if (settled === REVIVE_OUTRAN) {
    console.log(
      `${LOG} recipient-resolver: revive ${agentId} exceeded ${config.reviveTimeoutMs}ms — left running (retry next tick)`
    )
    return "benign"
  }

  switch (settled.kind) {
    case "back":
      console.log(
        `${LOG} recipient-resolver: revived ${agentId} (io advanced past revive — verified)`
      )
      return "revived"
    case "wedged":
      console.log(
        `${LOG} recipient-resolver: revive ${agentId} did NOT verify (io did not advance ` +
          `past revive / boot failed) — NOT revived, surfacing: ${settled.detail}`
      )
      return "unverified"
    case "failed":
      console.error(
        `${LOG} recipient-resolver: revive ${agentId} FAILED — the seat was NOT ` +
          `revived and the inbound work that matched it is still waiting: ${settled.detail}`
      )
      return "failed"
    default:
      return assertNever(settled)
  }
}
