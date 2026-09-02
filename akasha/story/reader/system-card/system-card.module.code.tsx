import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"

export function SystemCard({
  title,
  lines,
  dim,
}: {
  title?: string
  lines?: readonly string[]
  dim?: boolean
}) {
  return (
    <SurfaceProvider
      level={1}
      className={`flex flex-col gap-2 rounded-xl p-4 font-mono text-[13.5px] leading-[1.55] shadow-sm ${
        dim === true ? "opacity-60" : ""
      }`}
    >
      {title != null ? (
        <div className="font-bold text-[11px] text-accent uppercase tracking-[0.2em]">{title}</div>
      ) : null}
      {(lines ?? []).length > 0 ? (
        <div>
          {(lines ?? []).map((line, i) => (
            <div key={i} className="whitespace-pre-wrap text-secondary">
              {line}
            </div>
          ))}
        </div>
      ) : null}
    </SurfaceProvider>
  )
}

export function UnavailableSystemCard() {
  return (
    <SurfaceProvider
      level={1}
      className="flex flex-col gap-2 rounded-xl p-4 font-mono text-[13.5px] leading-[1.55] shadow-sm"
    >
      <div className="text-secondary italic">System window unavailable.</div>
    </SurfaceProvider>
  )
}
