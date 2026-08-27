#!/usr/bin/env bun

console.log("@shared/utils-system — OS-level workstation utilities")
console.log("Public API:")
console.log("  @shared/utils-system/memory-guard")
console.log("    MIN_FREE_MEMORY_GB, assessMemoryGuard, readMemAvailableKb, enforceMemoryGuard")
console.log("Runtime: Linux-only (reads /proc/meminfo, /proc/<pid>/status)")
