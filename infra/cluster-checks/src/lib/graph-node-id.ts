export const CHECK_FILTERING_REPO = "code"

export const graphNodeId = (type: string, key: string): string =>
  `${type}:${CHECK_FILTERING_REPO}:${key}`
