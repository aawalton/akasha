export function recordFromKeys<K extends string, V>(
  keys: readonly K[],
  produce: (key: K) => V
): Record<K, V> {
  return keys.reduce<Record<K, V>>((acc, key) => {
    acc[key] = produce(key)
    return acc
  }, Object.create(null))
}
