export type Dragged = { readonly active: { readonly id: string | number } }

export type Held = { current: string | null }

export type Naming = (id: string | null) => void

export function tookHold(event: Dragged, held: Held, setActiveId: Naming): undefined {
  const id = String(event.active.id)
  held.current = id
  setActiveId(id)
}

export function letGo(
  held: Held,
  setActiveId: Naming,
  setDropTarget: (at: null) => void
): undefined {
  held.current = null
  setActiveId(null)
  setDropTarget(null)
}
