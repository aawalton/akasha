import type { PoolBarColor, PoolPresentation } from "@alanwalton/awen-core/game-schema"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { ClientHud } from "../lib/client-session"
import { computePoolBars, type PoolBar } from "../lib/pool-bars"

const FILL_CLASS: Record<PoolBarColor, string> = {
  red: "bg-red",
  blue: "bg-blue",
  green: "bg-green",
}

function titleCase(key: string): string {
  return key
    .split(/[\s_-]+/)
    .filter((w) => w !== "")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

function Delta({ value }: { value: number | undefined }) {
  if (value == null || value === 0) return null
  const up = value > 0
  return (
    <span className={`font-bold text-[10px] ${up ? "text-green" : "text-red"}`}>
      {up ? `+${value}` : value}
    </span>
  )
}

function StatBar({ bar }: { bar: PoolBar }) {
  return (
    <div className="flex flex-col gap-[3px]">
      <div className="flex justify-between font-mono text-[11px] text-tertiary tracking-[0.05em]">
        <span>{bar.label}</span>
        <span className="inline-flex items-baseline gap-px">
          <Delta value={bar.delta} />
          <span className="font-semibold text-primary">
            {bar.max !== undefined ? `${bar.cur} / ${bar.max}` : bar.cur}
          </span>
        </span>
      </div>
      <div className={`h-2 overflow-hidden rounded-full ${surfaceClass(2)}`}>
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${FILL_CLASS[bar.color]}`}
          style={{ width: `${bar.pct}%` }}
        />
      </div>
    </div>
  )
}

function PoolRow({
  name,
  value,
  delta,
}: {
  name: string
  value: number
  delta: number | undefined
}) {
  return (
    <div className="flex items-baseline justify-between font-mono text-[12px] text-tertiary tracking-[0.05em]">
      <span>{titleCase(name)}</span>
      <span className="inline-flex items-baseline gap-px">
        <Delta value={delta} />
        <span className="font-semibold text-primary">{value}</span>
      </span>
    </div>
  )
}

function HudHeader({ hud }: { hud: ClientHud }) {
  const delta = hud.delta ?? {}
  const attrPoints = hud.pools?.["attrPoints"]
  return (
    <>
      {hud.level != null ? (
        <div className="flex items-baseline justify-between font-mono">
          <span className="text-secondary text-sm">Level</span>
          <span className="inline-flex items-baseline gap-px font-semibold text-primary text-sm">
            <Delta value={delta["level"]} />
            Lv {hud.level}
          </span>
        </div>
      ) : null}
      {attrPoints != null && attrPoints > 0 ? (
        <div className="rounded-md bg-accent/15 px-2 py-1 text-center font-mono text-[11px] text-accent">
          Attribute points: {attrPoints}
        </div>
      ) : null}
    </>
  )
}

export function HudPanel({
  hud,
  pools,
}: {
  hud: ClientHud | null
  pools?: readonly PoolPresentation[]
}) {
  if (hud === null) return null
  const poolMap = hud.pools ?? {}
  const poolEntries = Object.entries(poolMap)
  if (hud.level == null && poolEntries.length === 0) return null
  const delta = hud.delta ?? {}
  const bars = pools !== undefined && pools.length > 0 ? computePoolBars(hud, pools) : null

  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <HudHeader hud={hud} />
      {bars !== null ? (
        bars.length > 0 ? (
          <div className="flex flex-col gap-3">
            {bars.map((bar) => (
              <StatBar key={bar.key} bar={bar} />
            ))}
          </div>
        ) : null
      ) : poolEntries.length > 0 ? (
        <div className="flex flex-col gap-[6px]">
          {poolEntries.map(([name, value]) => (
            <PoolRow key={name} name={name} value={value} delta={delta[name]} />
          ))}
        </div>
      ) : null}
    </SurfaceProvider>
  )
}
