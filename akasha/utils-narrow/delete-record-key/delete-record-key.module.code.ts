export function deleteRecordKey<K extends string, V>(
  record: Record<K, V | undefined>,
  key: K
): undefined {
  record[key] = undefined
}
