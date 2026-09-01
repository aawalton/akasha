export function isWebKit(userAgent: string): boolean {
  if (!/AppleWebKit/.test(userAgent)) return false
  if (/Chrom(e|ium)\/|Edg\/|OPR\/|SamsungBrowser\//.test(userAgent)) return false
  return /Safari\/|Mobile\/|Version\//.test(userAgent)
}

export function isWebKitClient(): boolean {
  if (typeof navigator === "undefined") return false
  return isWebKit(navigator.userAgent)
}
