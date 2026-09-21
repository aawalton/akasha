export function requireSavedVariables<T>(instance: T | undefined): T {
  if (instance === undefined) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return instance
}
