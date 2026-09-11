import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const sixSeatTreesHaveEachPeakedPastEighteenGibibytes = {
  id: "01a09165-a9ab-76bf-9315-52c26619fe21",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "six-seat-trees-have-each-peaked-past-eighteen-gibibytes",
  domain: "domain/memory-limit",
  claim:
    "A seat tree reaches far more than anyone has assumed. Six of the sixteen live seat scopes have each peaked past 18 GiB, the largest at 32.2 GiB on a host with 62.2 GiB, and app.slice as a whole peaked at 55.5 GiB. So a ceiling low enough to catch a runaway early would refuse work seats are doing today, and the largest tree has already reached the reaper's per-tree ceiling of 32 GiB. The kernel keeps each of these numbers itself, and nothing in the repository reads them.",
  evidence:
    "Read on 2026-09-11 from memory.peak under /sys/fs/cgroup/user.slice/user-1000.slice/user@1000.service/, which every cgroup keeps as a lifetime high-water mark.\n\nThe sixteen tmux-spawn scopes under app.slice, peak per scope in GiB: 32.2, 31.7, 28.8, 26.8, 22.7, 18.6, 9.2, 8.6, 7.8, 6.3, 5.3, 3.7, 3.6, 3.5, 3.0, 1.7.\n\napp.slice itself: 59573080064 bytes, 55.5 GiB.\nuser.slice under the manager: 11650424832 bytes, 10.8 GiB, almost all of it one libpod container scope at 11594522624.\nSteam: 8599900160 bytes. The two Brave scopes: 1849372672 and 1316438016.\n\nMemTotal is 65180400 kB, 62.2 GiB. SwapTotal is 83886072 kB, 80 GiB.\n\nThe reaper holds a per-process resident ceiling of 32 GiB and a per-tree proportional ceiling of 32 GiB, both in memory-reaper-legs. The per-tree leg reaches nothing today because no live process matches its supervisor predicate, which ryn already recorded.\n\nA peak from memory.peak counts page cache charged to the cgroup as well as anonymous memory, so it is the number a MemoryMax would be enforced against rather than a resident-set figure.",
} as const satisfies Finding
