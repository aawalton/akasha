import type { Check, CheckRun, Tree } from "../check/check-shape.ts";
export type Held = {
    readonly before: Tree | null;
    readonly keep: () => string;
};
export declare function runAll(checks: readonly Check[], paths: readonly string[], tree: Tree, held: Held): readonly CheckRun[];
