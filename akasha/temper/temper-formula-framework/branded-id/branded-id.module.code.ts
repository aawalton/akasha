export type BuildHash = string & { readonly __brand: "BuildHash" }

export function buildHash(hash: string): BuildHash {
  return hash as BuildHash
}

export type BuildId = string & { readonly __brand: "BuildId" }

export function buildId(id: string): BuildId {
  return id as BuildId
}

export type EsoCharacterId = string & { readonly __brand: "EsoCharacterId" }

export function esoCharacterId(id: string): EsoCharacterId {
  return id as EsoCharacterId
}
