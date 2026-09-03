import { maxTeam } from "@akasha/idle-system/accrual"
import { isUnlocked } from "@akasha/idle-system/gacha-state"
import type { GameState } from "@akasha/idle-system/state"
import {
  applyDrop,
  pickerCandidates,
} from "../lineup-slots-draft/lineup-slots-draft.module.code.ts"
import type { IdleActions } from "../use-idle-actions/use-idle-actions.module.code.ts"

export function AddSeatPicker({ state, actions }: { state: GameState; actions: IdleActions }) {
  const active = state.activeTeam ?? []
  const cap = maxTeam(state)
  const unlocked = state.teammates.filter((t) => isUnlocked(state, t.slug))
  const candidates = pickerCandidates(unlocked, active)
  if (candidates.length === 0 || active.length >= cap) {
    return null
  }
  const onAdd = (slug: string): undefined => {
    const next = applyDrop(active, slug, cap)
    if (next !== active) {
      actions.setTeam(next)
    }
  }
  return (
    <select
      className="slot-add"
      aria-label="add teammate to lineup"
      value=""
      onChange={(e) => {
        if (e.target.value !== "") {
          onAdd(e.target.value)
        }
      }}
    >
      <option value="">+ add teammate</option>
      {candidates.map((t) => (
        <option key={t.slug} value={t.slug}>
          {t.name}
        </option>
      ))}
    </select>
  )
}
