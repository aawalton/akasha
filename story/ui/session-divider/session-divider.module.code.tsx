import { surfaceClass } from "@akasha/design-primitives/surface-class"

export function SessionDivider({ session }: { session: number }) {
  return (
    <div className="flex items-center gap-3 text-[10px] text-secondary uppercase tracking-[0.32em]">
      <span className={`h-px flex-1 ${surfaceClass(3)}`} />
      Session {session}
      <span className={`h-px flex-1 ${surfaceClass(3)}`} />
    </div>
  )
}
