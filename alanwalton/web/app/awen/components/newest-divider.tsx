import { surfaceClass } from "@shared/design-primitives/components/surface-class"

export function NewestDivider() {
  return (
    <div className="flex items-center gap-3 text-[10px] text-blue uppercase tracking-[0.32em]">
      <span className={`h-px flex-1 ${surfaceClass(3)}`} />
      newest
      <span className={`h-px flex-1 ${surfaceClass(3)}`} />
    </div>
  )
}
