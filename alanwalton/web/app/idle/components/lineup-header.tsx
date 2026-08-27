import { maxTeam } from "../lib/core/accrual"
import { isUnlocked } from "../lib/core/gacha/state"
import { type GameState } from "../lib/core/types"
import { applyDrop, pickerCandidates } from "~/idle/lib/lineup-slots-draft"
import type { IdleActions } from "~/idle/lib/use-idle-actions"

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
