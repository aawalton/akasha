export function addIdToListAt(lists: Record<number, number[]>, key: number, id: number): undefined {
  let list = lists[key]
  if (list === undefined) {
    list = []
    lists[key] = list
  }

  for (const knownId of list) {
    if (knownId === id) return
  }
  list.push(id)
}
